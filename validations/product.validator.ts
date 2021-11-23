import Joi from 'joi';
import { objectId } from '../core/custom.validation';

export const createProduct = {
     body: Joi.object().keys({
          title: Joi.string().required(),
          description: Joi.string().required(),
          userId: Joi.string(),
     }),
};

export const getOneProduct = {
     params: Joi.object().keys({
          productId: Joi.string().custom(objectId).required(),
     }),
};

export const updateProduct = {
     params: Joi.object().keys({
          productId: Joi.string().custom(objectId).required(),
     }),
     body: Joi.object().keys({
          title: Joi.string(),
          description: Joi.string(),
     }),
};

export const removeProduct = {
     params: Joi.object().keys({
          productId: Joi.string().custom(objectId).required(),
     }),
};
