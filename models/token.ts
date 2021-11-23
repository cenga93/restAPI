import { Document, Model, model, Schema } from 'mongoose';
import { TokenTypes } from '../config/enums';
import { IToken } from '../interfaces';

export interface ITokenModel extends IToken, Document {}

const TokenSchema = new Schema(
     {
          token: {
               type: String,
               required: true,
               index: true,
          },
          user: {
               type: Schema.Types.ObjectId,
               ref: 'User',
               required: true,
          },
          type: {
               type: String,
               enum: Object.values(TokenTypes),
               required: true,
          },
          expires: {
               type: Date,
               required: true,
          },
          blacklisted: {
               type: Boolean,
               default: false,
          },
     },
     {
          timestamps: true,
     }
);

const Token: Model<ITokenModel> = model<ITokenModel>('Token', TokenSchema);

export default Token;
