import Joi from 'joi';
import { objectId, password } from '../core/custom.validation';
import { Roles } from '../config/enums';

export const login = {
     body: Joi.object().keys({
          email: Joi.string().required(),
          password: Joi.string().required(),
     }),
};

export const verify = {
     params: Joi.object().keys({
          verifyId: Joi.string().custom(objectId).required(),
     }),
     body: Joi.object().keys({
          code: Joi.string().required(),
     }),
};

export const createUser = {
     body: Joi.object().keys({
          firstName: Joi.string(),
          lastName: Joi.string(),
          email: Joi.string().required().email(),
          password: Joi.string().required().custom(password),
          role: Joi.string().valid(...Object.values(Roles)),
     }),
};

export const updateUser = {
     params: Joi.object().keys({
          userId: Joi.string().custom(objectId).required(),
     }),
     body: Joi.object()
          .keys({
               email: Joi.string().email(),
               password: Joi.string().custom(password),
               firstName: Joi.string(),
               lastName: Joi.string(),
          })
          .min(1),
};
