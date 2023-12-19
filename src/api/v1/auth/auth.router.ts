import * as express from 'express';
import { Request, Response, Router } from 'express';
import authService from '../../../services/auth/auth.service';


export const authRouter: Router = express.Router();

authRouter.post('/registration', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        /**
         * Добавить валидатор для почты и пароля
         */
        if (email && password) {
            const user = await authService.registration(email, password);
            res.status(201).send(user);
        } else {
            res.status(400).send('Не правильные данные');
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
});