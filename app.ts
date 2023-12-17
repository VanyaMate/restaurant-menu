import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { Express } from 'express';
import * as process from 'process';
import { apiRouter } from './src/api/api.router';


const app: Express    = express();
const envPort: number = parseInt(process.env.PORT);
const port: number    = isNaN(envPort) ? 3000 : envPort;
const prisma          = new PrismaClient();

app.use(cookieParser());
app.use(cors({ origin: '*' }));
app.use('api', apiRouter);

app.listen(port, () => {
    console.log('server work on', port); //
});