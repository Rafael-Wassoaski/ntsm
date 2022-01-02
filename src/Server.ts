import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import expressSession from 'express-session';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from './shared/Logger';
import config from "config";

const app = express();
const { BAD_REQUEST } = StatusCodes;


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('ntsm'));
app.use(bodyParser.json());
const store = new expressSession.MemoryStore();
const cookiesName: string = config.get('cookies.sessionKey');
const cookiesSessionSecret: string = config.get('cookies.sessionSecret');
app.use(expressSession({
    store,
    name: cookiesName,
    secret: cookiesSessionSecret
}));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add Views Response
app.use('/', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

app.set('view engine', 'ejs');
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Export express instance
export default app;
