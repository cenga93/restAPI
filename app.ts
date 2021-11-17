import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index';
const { errorConverter, errorHandler } = require('./middleware/error');
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

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

mongoose.Promise = global.Promise;

app.use('/api', router());

app.use(errorConverter);
app.use(errorHandler);

export default app;
