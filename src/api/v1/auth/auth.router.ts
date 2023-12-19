import * as express from 'express';
import { Request, Response, Router } from 'express';
import { IAuthService } from '../../../services/auth/auth.interface';
import { PublicUser } from '../../../services/user/user.types';
import { AuthService } from '../../../services/auth/auth.service';
import { UserPrismaRepository } from '../../../repository/user/user-prisma.repository';
import { UserPrismaMapper } from '../../../mapper/user/user-prisma.mapper';
import { UserPrismaFilterMapper } from '../../../mapper/user/user-prisma-filter.mapper';
import { UserMapper } from '../../../mapper/user/user.mapper';
import { TokenService } from '../../../services/token/token.service';
import { TokenPrismaRepository } from '../../../repository/token/token-prisma.repository';
import { TokenPrismaMapper } from '../../../mapper/token/token-prisma.mapper';
import { JwtService } from '../../../services/jwt/jwt.service';
import { PrismaClient } from '@prisma/client';


export const authRouter: Router             = express.Router();
const prisma                                = new PrismaClient();
const authService: IAuthService<PublicUser> = new AuthService(
    new UserPrismaRepository(
        prisma,
        new UserPrismaMapper(),
        new UserPrismaFilterMapper(),
    ),
    new UserMapper(),
    new TokenService(
        new TokenPrismaRepository(
            prisma,
            new TokenPrismaMapper(
                new UserPrismaMapper(),
            ),
        ),
    ),
    new JwtService('secret_key'),
);

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