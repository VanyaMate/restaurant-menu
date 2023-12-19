import * as express from 'express';
import { Request, Response, Router } from 'express';
import rolePrismaRepository from '../../../repository/role/role-prisma.repository';


export const roleRouter: Router = express.Router();

roleRouter.post('', async (req: Request, res: Response) => {
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