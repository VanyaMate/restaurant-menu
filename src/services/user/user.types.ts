import { Role } from '../role/role.types';


export type PrivateUser = {
    id: string;
    email: string;
    password: string;
    avatar: string;
    firstName?: string;
    lastName?: string;
    roleId?: string;
} & PrivateUserIncludes;

export type PrivateUserIncludes = {
    role?: Role;
}

export type UserCreateDto = {
    email: string;
    password: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    roleId?: string;
}

export type UserUpdateDto = UserCreateDto;

export type PublicUser = Omit<PrivateUser, 'id' | 'password' | 'roleId'>;