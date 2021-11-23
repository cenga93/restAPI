import { IUser } from '../interfaces';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import { TokenTypes } from '../config/enums';
import { addMinutes, getUnixTime, addDays } from 'date-fns';
import Token from '../models/token';
import { IToken } from '../interfaces';

/**
 * Generate token with jwt
 *
 * @param userId - This should be the id of user
 * @param expires - This should be the token expiration date
 * @param type - This should be the token expiration date
 */
export const generateToken = (userId: string, expires: number | Date, type: any): string => {
     const payload = {
          sub: userId,
          iat: getUnixTime(new Date()),
          exp: getUnixTime(expires),
          type,
     };
     return jwt.sign(payload, 'secret');
};

/**
 * Save token in database
 *
 * @param token - This should be the created token
 * @param userId - This should be the id of user
 * @param expires - This should be the token expiration date
 * @param type - This should be the token expiration date
 * @param blacklisted - This should be the boolean value
 */
const saveToken = async (token: string, userId: string, expires: Date, type: string, blacklisted: boolean = false): Promise<void> => {
     await Token.create({ token, user: userId, expires, type, blacklisted });
};

/**
 * This function returns the access token and  refresh token
 *
 * @param user - This should be the IUser
 * @return IToken
 */
const generateAuthTokens = async (user: IUser): Promise<IToken> => {
     const { _id } = user;

     const accessTokenExpires: Date = addMinutes(new Date(), config.jwt.accessExpirationMinutes);
     const accessToken: string = generateToken(_id, accessTokenExpires, TokenTypes.ACCESS);

     const refreshTokenExpires: Date = addDays(new Date(), config.jwt.refreshExpirationDays);
     const refreshToken: string = generateToken(_id, refreshTokenExpires, TokenTypes.REFRESH);

     /** Save refresh token in database */
     await saveToken(refreshToken, _id, refreshTokenExpires, TokenTypes.REFRESH);

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
