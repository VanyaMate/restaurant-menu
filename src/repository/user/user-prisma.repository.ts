import { IRepository } from '../repository.interface';
import {
    PrivateUser,
    PrivateUserIncludes,
    UserCreateDto,
    UserUpdateDto,
} from '../../services/user/user.types';
import { Filter, Include, MultiplyResponse, Options } from '../repository.types';
import { Prisma, User, PrismaClient } from '@prisma/client';
import { IMapper } from '../../mapper/mapper.interface';
import userPrismaMapper, { PrismaUser } from '../../mapper/user/user-prisma.mapper';
import userPrismaFilterMapper from '../../mapper/user/user-prisma-filter.mapper';
import { toInt } from '../../helpers/numbers/toInt';


export class UserPrismaRepository implements IRepository<PrivateUser, PrivateUserIncludes, UserCreateDto, UserUpdateDto> {
    constructor (
        private readonly prismaClient: PrismaClient,
        private readonly userPrismaMapper: IMapper<PrismaUser, PrivateUser>,
        private readonly userFilterMapper: IMapper<Filter<PrivateUser>, Prisma.UserWhereInput>,
    ) {
    }

    public async create (data: UserCreateDto, includes?: Include<PrivateUserIncludes>): Promise<PrivateUser> {
        try {
            const roleId: number = toInt(data.roleId, 1);
            const userData       = await this.prismaClient.user.create({
                data   : {
                    email    : data.email,
                    password : data.password,
                    lastName : data.lastName,
                    firstName: data.firstName,
                    roleId   : roleId,
                },
                include: {
                    role: !!includes?.role,
                },
            });
            return this.userPrismaMapper.convert(userData);
        } catch (_) {
            throw new Error('Такой пользователь уже существует');
        }
    }

    public async delete (id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public async findById (id: string, includes?: Include<PrivateUserIncludes>): Promise<PrivateUser> {
        return Promise.resolve(undefined);
    }

    public async findManyByFilter (filter: Filter<PrivateUser>, options: Options<PrivateUser> = {}, includes?: Include<PrivateUserIncludes>): Promise<MultiplyResponse<PrivateUser>> {
        try {
            if (typeof filter === 'function') return {
                list   : [],
                options: {},
                count  : 0,
            };
            const where: Prisma.UserWhereInput        = this.userFilterMapper.convert(filter);
            const orderBy                             = options.sort
                                                        ? { [options.sort[0]]: options.sort[1] }
                                                        : undefined;
            const [ count, list ]: [ number, User[] ] = await this.prismaClient.$transaction([
                    this.prismaClient.user.count({ where }),
                    this.prismaClient.user.findMany({
                        where,
                        include: {
                            role: !!includes?.role,
                        },
                        skip   : options.offset,
                        take   : options.limit,
                        orderBy: orderBy,
                    }),
                ],
            );
            return {
                list: list.map((item) => this.userPrismaMapper.convert(item)),
                count,
                options,
            };
        } catch (e) {
            throw new Error(e);
        }
    }

    public async findOneByFilter (filter: Filter<PrivateUser>, includes?: Include<PrivateUserIncludes>): Promise<PrivateUser> {
        try {
            if (typeof filter === 'function') return null;
            const where: Prisma.UserWhereInput = this.userFilterMapper.convert(filter);
            const user: User                   = await this.prismaClient.user.findFirst({
                where,
                include: {
                    role: !!includes?.role,
                },
            });
            return this.userPrismaMapper.convert(user);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async update (id: string, data: UserUpdateDto, includes?: Include<PrivateUserIncludes>): Promise<PrivateUser> {
        return Promise.resolve(undefined);
    }
}

export default new UserPrismaRepository(new PrismaClient(), userPrismaMapper, userPrismaFilterMapper);