import * as express from 'express';
import { Router } from 'express';
import { AuthService } from '../../services/auth/auth.service';
import { UserPrismaRepository } from '../../repository/user/user-prisma.repository';
import { PrismaClient } from '@prisma/client';


export const apiV1Router: Router = express.Router();
const prisma = new PrismaClient()();


apiV1Router.use('auth', (req, res) => {
    new AuthService(
        new UserPrismaRepository(prisma)
    )
});