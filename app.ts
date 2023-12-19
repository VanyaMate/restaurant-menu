import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { Express } from 'express';
import * as process from 'process';
import * as bodyParser from 'body-parser';
import { toInt } from './src/helpers/numbers/toInt';
import { apiRouter } from './src/api/api.router';


const app: Express = express();
const port: number = toInt(process.env.PORT, 3000);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log('server work on', port); //
});