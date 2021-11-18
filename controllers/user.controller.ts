import { Request, Response } from 'express';
import { catchAsync } from 'catch-async-express';
import Default from '../default/index';
import User from '../models/user';
import httpStatus from 'http-status';
import { IUser } from '../interfaces/user';
import { IFilter } from '../interfaces/filter';
import ApiError from '../utils/ApiError';

/**
 * Get all users
 *
 * @param req - Request
 * @param res - Response
 * @returns IUser[]
 */
export const getAll = catchAsync(async (req: Request, res: Response) => {
     const users: IUser[] = await Default.getAll(User);

     res.status(httpStatus.OK).json(users);
});

/**
 * Get one user
 *
 * @param req - Request
 * @param res - Response
 * @returns IUser
 */
export const getOne = catchAsync(async (req: Request, res: Response) => {
     const filter: IFilter = { _id: req.params.userId };

     const user = await Default.getOne(User, filter);

     if (!user) throw new ApiError(httpStatus.FORBIDDEN, 'Not found user');

     res.status(httpStatus.OK).json(user);
});

/**
 * Remove user
 *
 * @param req - Request
 * @param res - Response
 * @returns IUser (deleted)
 */
export const remove = catchAsync(async (req: Request, res: Response) => {
     const filter: IFilter = { _id: req.params.userId };

     const removedUser = await Default.remove(User, filter);
     if (!removedUser) throw new ApiError(httpStatus.FORBIDDEN, 'User not found');

     res.status(httpStatus.OK).json(removedUser);
});
