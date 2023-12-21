import { NextFunction, RequestHandler } from 'express';
import { IJwtService } from '../../services/jwt/jwt.interface';
import { ITokenService } from '../../services/token/token.interface';
import { Token } from '../../services/token/token.types';


export const AUTH_USER = 'auth_user';

export const cookieAuthUserByJwtMiddleware = function (
    cookieName: string,
    jwtService: IJwtService,
    tokenService: ITokenService<Token>,
): RequestHandler {
    return async (req, res, next: NextFunction) => {
        const cookie = req.cookies[cookieName];
        if (cookie) {
            const value = jwtService.verify<{ token: string }>(cookie);
            if (value.token) {
                const token = await tokenService.getByToken(value.token);
                if (token) {
                    req[AUTH_USER] = token.user;
                }
            }
        }
        next();
    };
};