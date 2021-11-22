import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError, { IError } from '../utils/ApiError';

/**
 * Errors converter
 *
 * @param err - This should be the error
 * @param req - This should be the Request
 * @param res - This should be the Response
 * @param next - This should be the NextFunction
 */

export const errorConverter = (err: IError, req: Request, res: Response, next: NextFunction): void => {
     let error: any = err;
     if (!(error instanceof ApiError)) {
          const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
          const message = error.message || httpStatus[statusCode];
          error = new ApiError(statusCode, message, false, err.stack);
     }
     next(error);
};

/**
 * Errors handler
 *
 * @param err - This should be the error
 * @param req - This should be the Request
 * @param res -- This should be the Response
 * @param _next - This should be the NextFunction
 */
export const errorHandler = (err: IError, req: Request, res: Response, _next: NextFunction): Response => {
     const { statusCode, message } = err;

     const response = { code: statusCode, message };

     return res.status(statusCode).json(response);
};
