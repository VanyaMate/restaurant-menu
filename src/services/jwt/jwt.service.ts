import { IJwtService } from './jwt.interface';
import jwt from 'jsonwebtoken';


export class JwtService implements IJwtService {
    constructor (private readonly _secret: string) {
    }

    decode<Data> (token: string): Data {
        try {
            return jwt.decode(token) as Data;
        } catch (_) {
            throw new Error('Неверный токен авторизации');
        }
    }

    encode<Data> (data: Data): string {
        return jwt.sign(data as object, this._secret);
    }

    verify (token: string): boolean {
        return !!jwt.verify(token, this._secret);
    }
}