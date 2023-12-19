import { IRepository } from '../repository.interface';
import {
    Token,
    TokenCreateDto,
    TokenIncludes,
    TokenUpdateDto,
} from '../../services/token/token.types';
import { Filter, Include, MultiplyResponse, Options } from '../repository.types';
import { Prisma, PrismaClient, User, Token as TokenPrisma } from '@prisma/client';
import { IMapper } from '../../mapper/mapper.interface';
import tokenPrismaMapper, { PrismaToken } from '../../mapper/token/token-prisma.mapper';
import tokenPrismaFilterMapper from '../../mapper/token/token-prisma-filter.mapper';


export class TokenPrismaRepository implements IRepository<Token, TokenIncludes, TokenCreateDto, TokenUpdateDto> {
    constructor (
        private readonly prismaClient: PrismaClient,
        private readonly tokenPrismaMapper: IMapper<PrismaToken, Token>,
        private readonly tokenFilterMapper: IMapper<Filter<Token>, Prisma.TokenWhereInput>,
    ) {
    }

    public async create (data: TokenCreateDto, includes?: Include<TokenIncludes>): Promise<Token> {
        const tokenDocument = await this.prismaClient.token.create({ data });
        return this.tokenPrismaMapper.convert(tokenDocument);
    }

    public async delete (id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public async findById (id: string, includes?: Include<TokenIncludes>): Promise<Token> {
        return Promise.resolve(undefined);
    }

    public async findManyByFilter (filter: Filter<Token>, options: Options<Token>, includes?: Include<TokenIncludes>): Promise<MultiplyResponse<Token>> {
        return Promise.resolve(undefined);
    }

    public async findOneByFilter (filter: Filter<Token>, includes?: Include<TokenIncludes>): Promise<Token> {
        try {
            if (typeof filter === 'function') return null;
            const where: Prisma.TokenWhereInput = this.tokenFilterMapper.convert(filter);
            const token: TokenPrisma            = await this.prismaClient.token.findFirst({
                where: where,
            });
            return this.tokenPrismaMapper.convert(token);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async update (id: string, data: TokenUpdateDto, includes?: Include<TokenIncludes>): Promise<Token> {
        return Promise.resolve(undefined);
    }

}

export default new TokenPrismaRepository(new PrismaClient(), tokenPrismaMapper, tokenPrismaFilterMapper);