import { Model } from 'mongoose';
import { IFilter, ISelect, IUser } from '../interfaces';

/**
 *
 * @param Collection
 * @param filter
 * @return boolean
 */
const isExists = async (Collection: Model<any>, filter: IFilter): Promise<boolean> => {
     return await Collection.exists(filter);
};

/**
 *
 * @param Collection
 * @param notAllowedFields - This should be the ISelect
 * @return User[]
 */
const getAll = async (Collection: Model<any>, notAllowedFields?: ISelect): Promise<any[]> => {
     return Collection.find().select(notAllowedFields);
};

/**
 *
 * @param Collection
 * @param filter
 * @param notAllowedFields
 * @return IUser
 */
const getOne = async (Collection: any, filter: IFilter, notAllowedFields?: ISelect): Promise<any> => {
     return await Collection.findOne(filter).select(notAllowedFields);
};

/**
 *
 * @param Collection
 * @param filter
 * @return IUser
 */
const remove = async (Collection: any, filter: IFilter): Promise<any> => {
     return await Collection.findOneAndRemove(filter);
};

export default { getAll, getOne, remove, isExists };
