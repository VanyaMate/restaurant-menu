import { PrivateUser } from '../user/user.types';


export type Role = {
    id: string;
    title: string;
    permissions: number;
} & RoleIncludes;

export type RoleIncludes = {
    users?: PrivateUser[];
}

export type RoleCreateDto = Pick<Role, 'title' | 'permissions'>;
export type RoleUpdateDto = Partial<Pick<Role, 'title' | 'permissions'>>;