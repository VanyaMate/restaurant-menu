import { IMapper } from '../mapper.interface';
import { Role as RolePrisma, User } from '@prisma/client';
import { Role } from '../../services/role/role.types';
import { PrivateUser } from '../../services/user/user.types';
import { PrismaUser } from '../user/user-prisma.mapper';


export type PrismaRole = RolePrisma & {
    users?: User[];
}

export class RolePrismaMapper implements IMapper<PrismaRole, Role> {
    constructor (
        private readonly userPrismaMapper: IMapper<PrismaUser, PrivateUser>,
    ) {
    }

    convert (from: PrismaRole): Role {
        return {
            id         : from.id.toString(),
            title      : from.title,
            permissions: from.permissions,
            users      : from.users?.map((user) => this.userPrismaMapper.convert(user)) ?? [],
        };
    }

}