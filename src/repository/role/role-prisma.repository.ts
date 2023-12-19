import { IRepository } from '../repository.interface';
import { Role, RoleCreateDto, RoleIncludes, RoleUpdateDto } from '../../services/role/role.types';
import { Filter, Include, MultiplyResponse, Options } from '../repository.types';
import { PrismaClient } from '@prisma/client';
import { IMapper } from '../../mapper/mapper.interface';
import rolePrismaMapper, { PrismaRole } from '../../mapper/role/role-prisma.mapper';


export class RolePrismaRepository implements IRepository<Role, RoleIncludes, RoleCreateDto, RoleUpdateDto> {
    constructor (
        private readonly prismaClient: PrismaClient,
        private readonly rolePrismaMapper: IMapper<PrismaRole, Role>,
    ) {
    }

    public async create (data: RoleCreateDto, includes?: Include<RoleIncludes>): Promise<Role> {
        const roleDocument = await this.prismaClient.role.create({
            data,
            include: {
                users: !!includes?.users,
            },
        });

        return this.rolePrismaMapper.convert(roleDocument);
    }

    public async delete (id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public async findById (id: string, includes?: Include<RoleIncludes>): Promise<Role> {
        return Promise.resolve(undefined);
    }

    public async findManyByFilter (filter: Filter<Role>, options: Options<Role>, includes?: Include<RoleIncludes>): Promise<MultiplyResponse<Role>> {
        return Promise.resolve(undefined);
    }

    public async findOneByFilter (filter: Filter<Role>, includes?: Include<RoleIncludes>): Promise<Role> {
        return Promise.resolve(undefined);
    }

    public async update (id: string, data: RoleUpdateDto, includes?: Include<RoleIncludes>): Promise<Role> {
        return Promise.resolve(undefined);
    }

}


export default new RolePrismaRepository(new PrismaClient(), rolePrismaMapper);