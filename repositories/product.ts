import { Request } from 'express';
import { IProduct } from '../interfaces';
import Product from '../models/product';
import { get } from 'lodash';

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

const updateProduct = async () => {
     console.log('updateProduct');
};

export default { createProduct, updateProduct };
