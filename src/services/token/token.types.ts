import { PrivateUser } from '../user/user.types';


export type TokenIncludes = {
    user?: PrivateUser;
}

export type Token = {
    id: string;
    token: string;
    userEmail: string;
} & TokenIncludes;