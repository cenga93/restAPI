import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from 'catch-async-express';
import Default from '../default/index';
import User, { IUserModel } from '../models/user';
import { IUser, IFilter } from '../interfaces';
import ApiError from '../utils/ApiError';
import userRepository from '../repositories/user';

/**
 * Create user.
 *
 * @param req - This should be the Request
 * @param res - This should be the Response
 * @returns IUser (created)
 */
export const create = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const response: IUser = await userRepository.createUser(req);

     res.status(httpStatus.OK).json(response);
});

/**
 * Get all users.
 *
 * @param req - This should be the Request
 * @param res - This should be the Response
 * @returns IUser[]
 */
export const getAll = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const notAllowedFields = { code: false };

     const users: IUserModel[] = await Default.getAll(User, notAllowedFields);

     res.status(httpStatus.OK).json(users);
});

/**
 * Get one user
 *
 * @param req - This should be the Request
 * @param res - This should be the Response
 * @returns IUser
 */
export const getOne = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const filter: IFilter = { _id: req.params.userId };

     const user: IUser = await Default.getOne(User, filter);
     if (!user) throw new ApiError(httpStatus.FORBIDDEN, 'User not found');

     res.status(httpStatus.OK).json(user);
});

/**
 * Remove user.
 *
 * @param req - Request
 * @param res - Response
 * @returns IUser (deleted)
 */
export const remove = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const filter: IFilter = { _id: req.params.userId };

     const removedUser = await Default.remove(User, filter);
     if (!removedUser) throw new ApiError(httpStatus.FORBIDDEN, 'User not found');

     res.status(httpStatus.OK).json(removedUser);
});
