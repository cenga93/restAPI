import { catchAsync } from 'catch-async-express';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import User, { IUserModel } from '../models/user';
import ApiError from '../utils/ApiError';
import authRepository from '../repositories/auth';
import tokenRepository from '../repositories/token';
import { IToken } from '../interfaces/token';

/**
 *  Login.
 *
 * @param req - This should be the Request
 * @param res - This should be the Response
 */
export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const { email, password } = req.body;

     const user: IUserModel | null = await authRepository.loginWithEmailAndPassword(email, password);
     const tokens: IToken = await tokenRepository.generateAuthTokens(user);

     res.status(httpStatus.OK).json({ ...user._doc, ...tokens });
});

/**
 * User account verification.
 *
 * @param req - This should be the Request
 * @param res - This should be the Response
 */
export const verify = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const _id: string = req.params.verifyId;
     const code: string = req.body.code;

     const verifiedUser: IUserModel | null = await User.findOne({ _id, code });

     if (!verifiedUser) throw new ApiError(httpStatus.FORBIDDEN, 'User not found');
     if (verifiedUser.verified) throw new ApiError(httpStatus.FORBIDDEN, 'User is already verified');

     Object.assign(verifiedUser, { verified: true });

     await verifiedUser.save();

     res.status(httpStatus.OK).json(verifiedUser);
});
