import { AuthData, IAuthService } from './auth.interface';
import { IRepository } from '../../repository/repository.interface';
import {
    PrivateUser,
    PrivateUserIncludes,
    PublicUser,
    UserCreateDto,
    UserUpdateDto,
} from '../user/user.types';
import { Token } from '../token/token.types';
import { IMapper } from '../../mapper/mapper.interface';
import { ITokenService } from '../token/token.interface';
import { IJwtService } from '../jwt/jwt.interface';


export class AuthService implements IAuthService<PublicUser> {
    constructor (
        private readonly userRepository: IRepository<PrivateUser, PrivateUserIncludes, UserCreateDto, UserUpdateDto>,
        private readonly userMapper: IMapper<PrivateUser, PublicUser>,
        private readonly tokenService: ITokenService<Token>,
        private readonly jwtService: IJwtService,
    ) {
    }

    public async login (login: string, password: string): Promise<AuthData<PublicUser>> {
        try {
            const userDocument: PrivateUser = await this.userRepository.findOneByFilter({
                email   : login,
                password: password,
            });
            if (!userDocument) {
                throw 'Неправильный логин или пароль';
            }
            const token: Token = await this.tokenService.getByUserId(userDocument.email);
            return [ this.userMapper.convert(userDocument), this.jwtService.encode(token.token) ];
        } catch (e) {
            throw new Error(e);
        }
    }

    public async refresh (token: string): Promise<AuthData<PublicUser>> {
        try {
            const tokenDocument: Token = await this.tokenService.getByUserId(token);
            if (!tokenDocument) {
                throw 'Token не обнаружен';
            }
            return [ this.userMapper.convert(tokenDocument.user), this.jwtService.encode(tokenDocument.token) ];
        } catch (e) {
            throw new Error(e);
        }
    }

    public async registration (login: string, password: string): Promise<AuthData<PublicUser>> {
        try {
            const userDocument: PrivateUser = await this.userRepository.create({
                email   : login,
                password: password,
                roleId  : '1',
            });
            const tokenDocument: Token = await this.tokenService.createByUserId(userDocument.email);
            return [ this.userMapper.convert(userDocument), this.jwtService.encode(tokenDocument.token) ];
        } catch (e) {
            throw new Error(e);
        }
    }

}