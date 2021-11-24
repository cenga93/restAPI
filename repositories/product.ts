import { Request } from 'express';
import { IProduct } from '../interfaces';
import Product, { IProductModel } from '../models/product';
import { get } from 'lodash';
import { UpdateQuery } from 'mongoose';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

/**
 *  Create new product.
 *
 * @param req - This should be the Request
 * @return IProduct (created)
 */
const createProduct = async (req: Request): Promise<IProduct> => {
     const userId: string = get(req, 'user._id').toString();

     return await new Product({ ...req.body, userId }).save();
};

/**
 *
 * @param body - This should be the data for updating.
 * @param _id - This should be the product id.
 * @return IProduct (updated)
 */
const updateProduct = async (body: UpdateQuery<IProductModel> | undefined, _id: string) => {
     const product = await Product.findOneAndUpdate({ _id }, body, { new: true });
     if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');

     return product;
};

export default { createProduct, updateProduct };
