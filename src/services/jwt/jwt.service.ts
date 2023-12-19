import { IJwtService } from './jwt.interface';
import * as jwt from 'jsonwebtoken';


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
        return jwt.sign(data as object, this._secret, {
            expiresIn: '14d',
        });
    }

    verify<Data> (token: string): Data {
        try {
            return jwt.verify(token, this._secret) as Data;
        } catch (e) {
            throw new Error('Неверный токен авторизации');
        }
    }
}

export default new JwtService('secret_key');