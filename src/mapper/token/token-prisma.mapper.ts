import { IMapper } from '../mapper.interface';
import { Token as TokenPrisma, User } from '@prisma/client';
import { Token } from '../../services/token/token.types';
import { PrismaUser } from '../user/user-prisma.mapper';
import { PrivateUser } from '../../services/user/user.types';


export type PrismaToken = TokenPrisma & {
    user?: User;
}

export class TokenPrismaMapper implements IMapper<PrismaToken, Token> {
    constructor (private readonly userPrismaMapper: IMapper<PrismaUser, PrivateUser>) {
    }

    convert (from: PrismaToken): Token {
        return {
            id       : from.id.toString(),
            token    : from.token,
            userEmail: from.userEmail,
            user     : this.userPrismaMapper.convert(from.user),
        };
    }
}