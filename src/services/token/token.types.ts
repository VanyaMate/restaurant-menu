import { PrivateUser } from '../user/user.types';


export type TokenIncludes = {
    user?: PrivateUser;
}

export type Token = {
    id: string;
    token: string;
    userEmail: string;
} & TokenIncludes;

export type TokenCreateDto = Pick<Token, 'token' | 'userEmail'>;

export type TokenUpdateDto = Partial<Pick<Token, 'token' | 'userEmail'>>;