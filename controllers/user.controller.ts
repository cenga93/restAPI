import { Request, Response } from 'express';
import { catchAsync } from 'catch-async-express';
import Default from '../default/index';
import User from '../models/user';
import httpStatus from 'http-status';
import { IUser } from '../interfaces/user';
import { IFilter } from '../interfaces/filter';

/**  Get all users */
export const getAll = catchAsync(async (req: Request, res: Response) => {
     const users: IUser[] = await Default.getAll(User);

     res.status(httpStatus.OK).json(users);
});

/** Get one user */
export const getOne = catchAsync(async (req: Request, res: Response) => {
     const filter: IFilter = { _id: req.params.userId };

     const user = await Default.getOne(User, filter);

     res.status(httpStatus.OK).json(user);
});
