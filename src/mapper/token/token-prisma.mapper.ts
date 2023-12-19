import { IMapper } from '../mapper.interface';
import { Token as TokenPrisma, User } from '@prisma/client';
import { Token } from '../../services/token/token.types';
import userPrismaMapper, { PrismaUser } from '../user/user-prisma.mapper';
import { PrivateUser } from '../../services/user/user.types';


export type PrismaToken = TokenPrisma & {
    user?: User;
}

export class TokenPrismaMapper implements IMapper<PrismaToken, Token> {
    constructor (private readonly userPrismaMapper: IMapper<PrismaUser, PrivateUser>) {
    }

    convert (from: PrismaToken): Token {
        const token: Token = {
            id       : from.id.toString(),
            token    : from.token,
            userEmail: from.userEmail,
        };

        if (from.user) {
            token.user = this.userPrismaMapper.convert(from.user);
        }

        return token;
    }
}

export default new TokenPrismaMapper(userPrismaMapper);