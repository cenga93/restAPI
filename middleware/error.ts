import ApiError, { IError } from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

/**
 * Errors converter
 *
 * @param err - This should be the error
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
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
 * @param req - Request
 * @param res - Response
 * @param _next - NextFunction
 */
export const errorHandler = (err: IError, req: Request, res: Response, _next: NextFunction): Response => {
     let { statusCode, message } = err;

     const response = { code: statusCode, message };

     return res.status(statusCode).json(response);
};
