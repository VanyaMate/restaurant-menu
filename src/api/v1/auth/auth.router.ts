import * as express from 'express';
import { Request, Response, Router } from 'express';
import authService from '../../../services/auth/auth.service';
import { days14 } from '../../../constants/time.constants';


export const authRouter: Router = express.Router();

authRouter.post('/registration', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        /**
         * TODO: Можно добавить валидатор для почты и пароля
         */
        if (email && password) {
            const [ user, token ] = await authService.registration(email, password);
            res.cookie('user_token', token, {
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
            res.cookie('user_token', token, {
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