import * as express from 'express';
import { Router } from 'express';


export const apiV1Router: Router = express.Router();


apiV1Router.use('auth', () => {
});