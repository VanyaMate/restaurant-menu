export interface IJwtService {
    encode<Data> (data: Data): string;

    decode<Data> (token: string): Data;

    verify (token: string): boolean;
}