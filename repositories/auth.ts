import httpStatus from 'http-status';
import Default from '../default/';
import User from '../models/user';
import ApiError from '../utils/ApiError';

const loginWithEmailAndPassword = async (email: string, userPassword: string) => {
     /** Filter */
     const filter = { email };

     const notAllowedFields = { code: false };

     const user = await Default.getOne(User, filter, notAllowedFields);

     if (!user || !(await user.comparePassword(userPassword))) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
     }

     return user;
};

export default { loginWithEmailAndPassword };
