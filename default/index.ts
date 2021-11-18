import { Model } from 'mongoose';
import { IFilter } from '../interfaces/filter';
import { IUser } from '../interfaces/user';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const getAll = async (Collection: Model<any>): Promise<IUser[]> => {
     return Collection.find();
};

const getOne = async (Collection: any, filter: IFilter): Promise<IUser> => {
     const { name } = Collection.collection;

     const response = await Collection.findOne(filter);
     if (!response) throw new ApiError(httpStatus.FORBIDDEN, 'Not found user');

     return response;
};

export default {
     getAll,
     getOne,
};
