import { catchAsync } from 'catch-async-express';
import { Request, Response } from 'express';
import User from '../models/user';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

export const verify = catchAsync(async (req: Request, res: Response) => {
     const _id: string = req.params.verifyId;
     const code: string = req.body.code;

     const verifiedUser = await User.findOne({ _id, code });

     if (!verifiedUser) throw new ApiError(httpStatus.FORBIDDEN, 'User not found');
     if (verifiedUser.verified) throw new ApiError(httpStatus.FORBIDDEN, 'User is already verified');

     Object.assign(verifiedUser, { verified: true });

     await verifiedUser.save();

     res.status(httpStatus.OK).json(verifiedUser);
});
