import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import httpStatus from 'http-status';
import lodash from 'lodash';
import ApiError from '../utils/ApiError';

const validateMiddleware =
     (schema: { body?: Joi.ObjectSchema; params?: Joi.ObjectSchema }) => (req: Request, res: Response, next: NextFunction) => {
          const validSchema = lodash.pick(schema, ['params', 'query', 'body']);
          const object = lodash.pick(req, Object.keys(validSchema));
          const { value, error } = Joi.compile(validSchema)
               .prefs({ errors: { label: 'key' } })
               .validate(object);

          if (error) {
               const errorMessage = error.details.map((details) => details.message).join(', ');
               return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
          }

          Object.assign(req, value);
          return next();
     };

export default validateMiddleware;
