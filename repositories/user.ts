import { Request } from 'express';
import httpStatus from 'http-status';
import { IUser } from '../interfaces';
import Default from '../default';
import User, { IUserModel } from '../models/user';
import ApiError from '../utils/ApiError';
import { sendWelcomeMail } from '../services/mailer';
import { UpdateQuery } from 'mongoose';

/**
 *  Create new user.
 *
 * @param req - This should be the Request
 * @return IUser
 */
const createUser = async (req: Request): Promise<IUser> => {
     const { body } = req;

     /** Check if user exists in database */
     const userExists: boolean = await Default.isExists(User, { email: body.email });
     if (userExists) throw new ApiError(httpStatus.FORBIDDEN, 'User already exists');

     body.code = Math.round(Math.random() * (9999 - 1000) + 1000);

     const user: IUserModel = await new User(body).save();

     const url: URL = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

     /** Send welcome mail to new user email */
     await sendWelcomeMail(user, url);

     return await user.getPublicFields();
};

/**
 *  Update user.
 *
 * @param body - This should be the data for updating.
 * @param _id - This should be the user id.
 */
const updateUser = async (body: UpdateQuery<IUserModel> | undefined, _id: string): Promise<IUser> => {
     const user = await User.findOneAndUpdate({ _id }, body, { new: true });
     if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

     return user;
};

export default { createUser, updateUser };
