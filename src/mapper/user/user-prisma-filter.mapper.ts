import { IMapper } from '../mapper.interface';
import { Filter } from '../../repository/repository.types';
import { PrivateUser } from '../../services/user/user.types';
import { Prisma } from '@prisma/client';


export class UserPrismaFilterMapper implements IMapper<Filter<PrivateUser>, Prisma.UserWhereInput> {
    convert (from: Filter<PrivateUser>): Prisma.UserWhereInput {
        if (typeof from === 'function') {
            return {};
        }
        /**
         * Не завершенный, потому что а зачем оно вообще тут нужно.
         */
        return {
            email    : { equals: from.email },
            firstName: { equals: from.firstName },
            lastName : { equals: from.lastName },
        };
    }
}

export default new UserPrismaFilterMapper();