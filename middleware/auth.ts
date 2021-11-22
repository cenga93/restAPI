import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { rolePermissions } from '../config/roles';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces';

/**
 *
 * @param req - This should be the Request
 * @param requiredPermissions - This should be the permissions for this route.
 * @param resolve
 * @param reject
 */
const verifyCallbackFactory =
     (req: Request, resolve: any, reject: any, requiredPermissions: any) => async (err: any, user: IUser | null, info: any) => {
          if (err || info || !user) {
               return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
          }

          req.user = user;

          if (requiredPermissions.length) {
               const userPermissions = rolePermissions.get(user.role);
               const hasRequiredPermissions = requiredPermissions.every((requiredPermission: any) =>
                    userPermissions.includes(requiredPermission)
               );

               if (!hasRequiredPermissions && req.params.userId !== user._id) {
                    return reject(new ApiError(httpStatus.FORBIDDEN, "You don't have a permission for this action"));
               }
          }
          resolve();
     };

/**
 *
 * @param requiredPermissions - This should be the permissions for this route.
 */
const auth =
     (...requiredPermissions: any[]) =>
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          return new Promise((resolve, reject) => {
               const verifyCallback = verifyCallbackFactory(req, resolve, reject, requiredPermissions);
               const jwtAuth = passport.authenticate('jwt', { session: false }, verifyCallback);

               jwtAuth(req, res, next);
          })
               .then(() => next())
               .catch((err) => next(err));
     };

export default auth;
