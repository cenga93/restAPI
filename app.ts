import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/index';

const app: Express = express();

app.use(
     cors<Request>({
          origin: (origin, callback) => {
               return callback(null, true);
          },
     })
);

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
