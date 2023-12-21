export interface IJwtService {
    encode<Data> (data: Data): string;

    decode<Data> (token: string): Data;

    verify<Data> (token: string): Data;
}