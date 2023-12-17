import { Filter, Include, MultiplyResponse, Options } from './repository.types';


export interface IRepository<Item, Includes, CreateItemDto, UpdateItemDto> {
    create (data: CreateItemDto, includes?: Include<Includes>): Promise<Item>;

    update (id: string, data: UpdateItemDto, includes?: Include<Includes>): Promise<Item>;

    delete (id: string): Promise<boolean>;

    findById (id: string, includes?: Include<Includes>): Promise<Item>;

    findOneByFilter (filter: Filter<Item>, includes?: Include<Includes>): Promise<Item>;

    findManyByFilter (filter: Filter<Item>, options: Options<Item>, includes?: Include<Includes>): Promise<MultiplyResponse<Item>>;
}