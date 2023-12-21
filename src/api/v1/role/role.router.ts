import * as express from 'express';
import { Request, Response, Router } from 'express';
import rolePrismaRepository from '../../../repository/role/role-prisma.repository';
import {
    AUTH_USER, cookieAuthUserByJwtMiddleware,
} from '../../../middlewares/cookie-auth-user-by-jwt/cookie-auth-user-by-jwt.middleware';
import { PrivateUser } from '../../../services/user/user.types';
import { COOKIE_USER_TOKEN } from '../../../constants/cookie.constants';
import jwtService from '../../../services/jwt/jwt.service';
import tokenService from '../../../services/token/token.service';
import { IS_ADMIN, isAdmin } from '../../../middlewares/is-admin/is-admin.middleware';


export const roleRouter: Router = express.Router();

roleRouter.use(cookieAuthUserByJwtMiddleware(COOKIE_USER_TOKEN, jwtService, tokenService));
roleRouter.use(isAdmin);
roleRouter.post('', async (req: Request, res: Response) => {
    const isAdmin = req[IS_ADMIN];
    if (!isAdmin) {
        res.status(403).send('no access');
    }
    const { title, permissions } = req.body;
    if (title && permissions) {
        try {
            const role = await rolePrismaRepository.create({ title, permissions });
            res.status(201).send(role);
        } catch (e) {
            res.status(400).send(e);
        }
    } else {
        res.status(400).send('no valid data');
    }
});