import Joi from 'joi';
import { objectId } from '../core/custom.validation';

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
