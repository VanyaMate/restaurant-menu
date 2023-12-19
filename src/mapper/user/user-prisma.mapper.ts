import { IMapper } from '../mapper.interface';
import { User, Role } from '@prisma/client';
import { PrivateUser } from '../../services/user/user.types';


export type PrismaUser = User & {
    role?: Role;
}

export class UserPrismaMapper implements IMapper<PrismaUser, PrivateUser> {
    convert (from: PrismaUser): PrivateUser {
        const to: PrivateUser = {
            id       : from.id.toString(),
            password : from.password,
            email    : from.email,
            lastName : from.lastName,
            firstName: from.firstName,
            avatar   : '',
            roleId   : from.roleId.toString(),
        };

        if (from.role) {
            to.role = {
                ...from.role,
                id: from.role?.id?.toString(),
            };
        }

        return to;
    }
}

export default new UserPrismaMapper();