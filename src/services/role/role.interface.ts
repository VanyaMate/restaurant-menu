import { RoleCreateDto, RoleUpdateDto } from './role.types';
import { Filter, MultiplyResponse, Options } from '../../repository/repository.types';


export interface IRoleService<Role> {
    create (data: RoleCreateDto): Promise<Role>;

    update (data: RoleUpdateDto): Promise<Role>;

    delete (id: string): Promise<boolean>;

    findOneById (id: string): Promise<Role>;

    findManyByFilter (filter: Filter<Role>, options: Options<Role>): Promise<MultiplyResponse<Role>>;
}