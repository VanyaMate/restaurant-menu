import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { Express, NextFunction, Request, Response } from 'express';


const app: Express = express();
const prisma       = new PrismaClient();

app.use(cookieParser());
app.use(cors({ origin: '*' }));


app.get('/user', (req: Request, res: Response, next: NextFunction) => {
    const params = req.query;
    const email  = params.email;
    if (email) {
        const creation = prisma.user.create({
            data: { email: email.toString() },
        });

        creation.then((user) => console.log(user));
    }

    res.send(`create user`);
});

app.get('/users', (req: Request, res: Response, next: NextFunction) => {
    prisma
        .user
        .findMany({
            include: { roles: true },
            where  : {
                email: {
                    contains: 'admin',
                    mode    : 'insensitive',
                },
            },
        })
        .then((users) => res.send(users));
});

app.listen(3000, () => {
    console.log('server work on', 3000); //
});