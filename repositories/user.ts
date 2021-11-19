import { Request } from 'express';
import { IUser } from '../interfaces/user';
import Default from '../default';
import User from '../models/user';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { sendWelcomeMail } from '../services/mailer';
import { IFilter } from '../interfaces/filter';

const createUser = async (req: Request): Promise<IUser | null> => {
     const { body } = req;
     /**  Filter */
     const filter: IFilter = { email: body.email };

     /** Checking the existing */
     const userExists: boolean = await Default.isExists(User, filter);
     if (userExists) throw new ApiError(httpStatus.FORBIDDEN, 'User already exists');

     const data = await new User(body).save();

     const url: URL = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

     /** Send welcome mail to new client email */
     await sendWelcomeMail(data, url);

     const newUser = data.toObject();

     delete newUser.code;

     return newUser;
};

export default { createUser };
