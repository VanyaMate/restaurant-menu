import * as express from 'express';
import { apiV1Router } from './v1/api-v1.router';
import { Router } from 'express';


export const apiRouter: Router = express.Router();


apiRouter.use('v1', apiV1Router);