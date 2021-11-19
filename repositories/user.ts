import { Request } from 'express';
import httpStatus from 'http-status';
import { IUser, IFilter } from '../interfaces';
import Default from '../default';
import User from '../models/user';
import ApiError from '../utils/ApiError';
import { sendWelcomeMail } from '../services/mailer';

const createUser = async (req: Request): Promise<IUser> => {
     const { body } = req;

     /**  Filter */
     const filter: IFilter = { email: body.email };

     /** Check if user exists in database */
     const userExists: boolean = await Default.isExists(User, filter);
     if (userExists) throw new ApiError(httpStatus.FORBIDDEN, 'User already exists');

     const data = await new User(body).save();

     const url: URL = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

     /** Send welcome mail to new client email */
     await sendWelcomeMail(data, url);

     const newUser: IUser = data.toObject();

     delete newUser.code;

     return newUser;
};

export default { createUser };
