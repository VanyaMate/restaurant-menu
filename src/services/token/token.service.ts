import { ITokenService } from './token.interface';
import { Token, TokenCreateDto, TokenIncludes, TokenUpdateDto } from './token.types';
import { IRepository } from '../../repository/repository.interface';
import tokenPrismaRepository from '../../repository/token/token-prisma.repository';

export class TokenService implements ITokenService<Token> {
    constructor (
        private readonly tokenRepository: IRepository<Token, TokenIncludes, TokenCreateDto, TokenUpdateDto>,
    ) {
    }

    public async createByUserId (email: string): Promise<Token> {
        try {
            const token: Token = await this.tokenRepository.findOneByFilter({ userEmail: email });
            if (!token) {
                return this.tokenRepository.create({
                    userEmail: email,
                    token    : Math.random().toString(),
                });
            } else {
                return this.tokenRepository.update(token.id, {
                    token: Math.random().toString(),
                });
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    public async deleteByUserId (id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public async getByToken (token: string): Promise<Token> {
        try {
            return await this.tokenRepository.findOneByFilter({ token }, { user: {} });
        } catch (e) {
            throw new Error('Токен на найден');
        }
    }

    public async getByUserId (id: string): Promise<Token> {
        try {
            return await this.tokenRepository.findOneByFilter({ userEmail: id }, { user: {} });
        } catch (e) {
            throw new Error('Токен на найден');
        }
    }

    public async updateByUserId (id: string): Promise<Token> {
        return Promise.resolve(undefined);
    }

}

export default new TokenService(tokenPrismaRepository);