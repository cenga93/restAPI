import httpStatus from 'http-status';
import Default from '../default/';
import User, { IUserModel } from '../models/user';
import ApiError from '../utils/ApiError';
import { IFilter, ISelect } from '../interfaces';

const loginWithEmailAndPassword = async (email: string, userPassword: string): Promise<IUserModel> => {
     const filter: IFilter = { email };
     const notAllowedFields: ISelect = { code: false };
     const user: IUserModel = await Default.getOne(User, filter, notAllowedFields);

     if (!user || !(await user.comparePassword(userPassword))) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
     }

     return user;
};

export default { loginWithEmailAndPassword };
