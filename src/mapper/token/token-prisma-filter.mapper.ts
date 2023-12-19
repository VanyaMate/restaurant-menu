import { IMapper } from '../mapper.interface';
import { Token } from '../../services/token/token.types';
import { Filter } from '../../repository/repository.types';
import { Prisma } from '@prisma/client';
import { toInt } from '../../helpers/numbers/toInt';


export class TokenPrismaFilterMapper implements IMapper<Filter<Token>, Prisma.TokenWhereInput> {
    convert (from: Filter<Token>): Prisma.TokenWhereInput {
        if (typeof from === 'function') {
            return {};
        }
        /**
         * Не завершенный, потому что а зачем оно вообще тут нужно.
         */
        return {
            userEmail: from.userEmail ?? undefined,
            token    : from.token ?? undefined,
            id       : from.id ? toInt(from.id, 0) : undefined,
        } as Prisma.TokenWhereInput;
    }
}

export default new TokenPrismaFilterMapper();