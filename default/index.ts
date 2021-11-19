import { Model } from 'mongoose';
import { IFilter, IUser } from '../interfaces';

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
 * @return User[]
 */
const getAll = async (Collection: Model<any>): Promise<IUser[]> => {
     return Collection.find();
};

/**
 *
 * @param Collection
 * @param filter
 * @return IUser
 */
const getOne = async (Collection: any, filter: IFilter): Promise<IUser> => {
     return await Collection.findOne(filter);
};

/**
 *
 * @param Collection
 * @param filter
 * @return IUser
 */
const remove = async (Collection: any, filter: IFilter): Promise<IUser> => {
     return await Collection.findOneAndRemove(filter);
};

export default { getAll, getOne, remove, isExists };
