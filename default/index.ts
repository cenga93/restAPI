import { Model } from 'mongoose';
import { IFilter } from '../interfaces/filter';
import { IUser } from '../interfaces/user';

/**
 *
 * @param Collection
 * @param filter
 */
const isExists = async (Collection: Model<any>, filter: IFilter): Promise<boolean> => {
     return await Collection.exists(filter);
};

/**
 *
 * @param Collection
 */
const getAll = async (Collection: Model<any>): Promise<IUser[]> => {
     return Collection.find();
};

/**
 *
 * @param Collection
 * @param filter
 */
const getOne = async (Collection: any, filter: IFilter): Promise<IUser> => {
     return await Collection.findOne(filter);
};

/**
 *
 * @param Collection
 * @param filter
 */
const remove = async (Collection: any, filter: IFilter): Promise<IUser> => {
     return await Collection.findOneAndRemove(filter);
};

export default { getAll, getOne, remove, isExists };
