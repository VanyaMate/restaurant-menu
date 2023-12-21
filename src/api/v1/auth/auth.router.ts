import * as express from 'express';
import { Request, Response, Router } from 'express';
import authService from '../../../services/auth/auth.service';
import { days14 } from '../../../constants/time.constants';
import { COOKIE_USER_TOKEN } from '../../../constants/cookie.constants';
import {
    AUTH_USER,
    cookieAuthUserByJwtMiddleware,
} from '../../../middlewares/cookie-auth-user-by-jwt/cookie-auth-user-by-jwt.middleware';
import jwtService from '../../../services/jwt/jwt.service';
import tokenService from '../../../services/token/token.service';
import { PrivateUser } from '../../../services/user/user.types';


export const authRouter: Router = express.Router();

authRouter.post('/registration', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        /**
         * TODO: Можно добавить валидатор для почты и пароля
         */
        if (email && password) {
            const [ user, token ] = await authService.registration(email, password);
            res.cookie(COOKIE_USER_TOKEN, token, {
                expires : new Date(Date.now() + days14),
                httpOnly: true,
            });
            res.status(201).send(user);
        } else {
            res.status(400).send('Не правильные данные');
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
});

authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        /**
         * TODO: Можно добавить валидатор для почты и пароля
         */
        if (email && password) {
            const [ user, token ] = await authService.login(email, password);
            res.cookie(COOKIE_USER_TOKEN, token, {
                expires : new Date(Date.now() + days14),
                httpOnly: true,
            });
            res.status(201).send(user);
        } else {
            res.status(400).send('Не правильные данные');
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
});

authRouter.post('/logout', async (req: Request, res: Response) => {
    try {
        res
            .clearCookie(COOKIE_USER_TOKEN)
            .status(200)
            .send(true);
    } catch (e) {
        res
            .status(200)
            .send(e.message);
    }
});

authRouter.use('/refresh', cookieAuthUserByJwtMiddleware(COOKIE_USER_TOKEN, jwtService, tokenService));
authRouter.post('/refresh', async (req: Request, res: Response) => {
    // refresh token logic
    const user: PrivateUser | undefined = req[AUTH_USER];
    if (user) {
        res.status(200).send(`refresh token to user: ${ user.email }`);
    } else {
        res.status(403).send('no token to refresh');
    }
});