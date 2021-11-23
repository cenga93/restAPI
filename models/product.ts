import { Document, Model, model, Schema } from 'mongoose';
import { IProduct } from '../interfaces';

export interface IProductModel extends IProduct, Document {}

const ProductSchema = new Schema(
     {
          title: {
               type: String,
               required: true,
          },
          description: {
               type: String,
               required: true,
          },
          userId: {
               type: Schema.Types.ObjectId,
               ref: 'User',
               required: true,
          },
     },
     {
          timestamps: true,
     }
);

const Product: Model<IProductModel> = model<IProductModel>('Product', ProductSchema);

export default Product;
