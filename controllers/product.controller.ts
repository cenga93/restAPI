import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from 'catch-async-express';
import { IFilter, IProduct } from '../interfaces';
import productRepository from '../repositories/product';
import Default from '../default';
import Product from '../models/product';
import ApiError from '../utils/ApiError';

/**
 * Create product.
 *
 * @param req - This should be the Request
 * @param res - This should be the Response
 */
export const create = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const newProduct: IProduct = await productRepository.createProduct(req);

     res.status(httpStatus.OK).json(newProduct);
});

/**
 * Get all products.
 *
 * @param req - This should be the Request
 * @param res - This should be the Response
 */
export const getAll = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const products: IProduct[] = await Default.getAll(Product);

     res.status(httpStatus.OK).json(products);
});

/**
 * Get one product.
 *
 * @param req - This should be the Request
 * @param res - This should be the Response
 */
export const getOne = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const filter: IFilter = { _id: req.params.productId };

     const product: IProduct = await Default.getOne(Product, filter);
     if (!product) throw new ApiError(httpStatus.FORBIDDEN, 'Product not found');

     res.status(httpStatus.OK).json(product);
});

/**
 * Remove product.
 *
 * @param req - This should be the Request
 * @param res - This should be the Response
 */
export const remove = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const filter: IFilter = { _id: req.params.productId };

     const removedProduct: IProduct = await Default.remove(Product, filter);
     if (!removedProduct) throw new ApiError(httpStatus.FORBIDDEN, 'Product not found');

     res.status(httpStatus.OK).json(removedProduct);
});



export const update = catchAsync(async (req: Request, res: Response): Promise<void> => {
     console.log('update products');
});
