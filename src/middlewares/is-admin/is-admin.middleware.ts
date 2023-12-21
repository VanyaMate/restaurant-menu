import { NextFunction, RequestHandler } from 'express';
import { AUTH_USER } from '../cookie-auth-user-by-jwt/cookie-auth-user-by-jwt.middleware';
import { PrivateUser } from '../../services/user/user.types';


export const IS_ADMIN = 'is_admin';

export const isAdmin = function (req, res, next: NextFunction) {
    const user: PrivateUser | undefined = req[AUTH_USER];
    if (user && user.roleId === '2') {
        req[IS_ADMIN] = true;
    }
    next();
};