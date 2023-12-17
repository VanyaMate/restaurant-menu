export interface ITokenService<Token> {
    getByUserId (id: string): Promise<Token>;

    getByToken (token: string): Promise<Token>;

    createByUserId (id: string): Promise<Token>;

    updateByUserId (id: string): Promise<Token>;

    deleteByUserId (id: string): Promise<boolean>;
}