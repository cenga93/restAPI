import { IUser } from '../interfaces';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import { TokenTypes } from '../config/enums';
import { addMinutes, getUnixTime, addDays } from 'date-fns';
import Token from '../models/token';

/**
 *
 * @param userId - This should be the id of user
 * @param expires - This should be the token expiration date
 * @param type - This should be the token expiration date
 */
export const generateToken = (userId: string, expires: number | Date, type: any) => {
     const payload = {
          sub: userId,
          iat: getUnixTime(new Date()),
          exp: getUnixTime(expires),
          type,
     };
     return jwt.sign(payload, 'secret');
};

/**
 *
 * @param token - This should be the created token
 * @param userId - This should be the id of user
 * @param expires - This should be the token expiration date
 * @param type - This should be the token expiration date
 * @param blacklisted - This should be the boolean value
 */
const saveToken = async (token: string, userId: string, expires: Date, type: string, blacklisted: boolean = false) => {
     await Token.create({ token, user: userId, expires, type, blacklisted });
};

/**
 *
 * @param user - IUser
 * @returns  - access token and  refresh token
 */
const generateAuthTokens = async (user: IUser) => {
     const accessTokenExpires = addMinutes(new Date(), 30);
     const accessToken = generateToken(user._id, accessTokenExpires, TokenTypes.ACCESS);

     const refreshTokenExpires = addDays(new Date(), config.jwt.refreshExpirationDays);
     const refreshToken: string = generateToken(user._id, refreshTokenExpires, TokenTypes.REFRESH);

     await saveToken(refreshToken, user._id, refreshTokenExpires, TokenTypes.REFRESH);

     return {
          access: {
               token: accessToken,
               expires: accessTokenExpires,
          },
          refresh: {
               token: refreshToken,
               expires: refreshTokenExpires,
          },
     };
};

export default { generateAuthTokens };
