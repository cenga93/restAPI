import { Model } from 'mongoose';
import { IFilter } from '../interfaces/filter';
import { IUser } from '../interfaces/user';
import { Request } from 'express';

const create = async (Collection: Model<any>, req: Request): Promise<IUser | null> => {
     /**  Filter*/
     const filter: IFilter = { email: req.body.email };

     /** Check if email is already in use */
     const exists = await isExists(Collection, filter);

     if (exists) return null;


     const newObject = new Collection(req.body);

     return await newObject.save();
};

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

export default { getAll, getOne, remove, create };
