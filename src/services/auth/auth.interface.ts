export type AuthData<User> =
    [ User, string ];

export interface IAuthService<User> {
    login (login: string, password: string): Promise<AuthData<User>>;

    registration (login: string, password: string): Promise<AuthData<User>>;

    refresh (token: string): Promise<AuthData<User>>;
}