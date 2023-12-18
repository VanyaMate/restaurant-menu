import * as express from 'express';
import { Request, Response, Router } from 'express';
import { RolePrismaRepository } from '../../../repository/role/role-prisma.repository';
import { RolePrismaMapper } from '../../../mapper/role/role-prisma.mapper';
import { UserPrismaMapper } from '../../../mapper/user/user-prisma.mapper';
import { PrismaClient } from '@prisma/client';


export const roleRouter: Router = express.Router();
const roleRepository            = new RolePrismaRepository(
    new PrismaClient(),
    new RolePrismaMapper(
        new UserPrismaMapper(),
    ),
);

roleRouter.post('', async (req: Request, res: Response) => {
    const { title, permissions } = req.body;
    if (title && permissions) {
        try {
            const role = await roleRepository.create({ title, permissions });
            res.status(201).send(role);
        } catch (e) {
            res.status(400).send(e);
        }
    } else {
        res.status(400).send('no valid data');
    }
});