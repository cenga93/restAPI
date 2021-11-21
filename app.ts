import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/index';
import passport from 'passport';
import { jwtStrategy } from './config/passport';

const app: Express = express();

/** Setting various HTTP headers */
app.use(helmet());

/** Sanitizes user-supplied data to prevent MongoDB Operator Injection. */
app.use(mongoSanitize());

/**  Compression middleware */
app.use(compression());

app.use(
     cors<Request>({
          origin: (origin, callback) => {
               return callback(null, true);
          },
     })
);

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use((req: Request, res: Response, next: NextFunction) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' + ' Content-Type, Accept');
     return next();
});

/** Parse application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));

/** Parse application/json */
app.use(express.json());

mongoose.Promise = global.Promise;

/** Router */
app.use('/api', router());

export default app;
