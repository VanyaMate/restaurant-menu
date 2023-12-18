import * as express from 'express';
import { Router } from 'express';
import { authRouter } from './auth/auth.router';
import { roleRouter } from './role/role.router';


export const apiV1Router: Router = express.Router();


apiV1Router.use('/auth', authRouter);
apiV1Router.use('/role', roleRouter);