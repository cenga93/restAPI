import { IUserModel } from '../models/user';
import { TokenTypes } from '../config/enums';

export interface IToken {
     token: string;
     user: IUserModel;
     type: TokenTypes;
     expires: Date;
     blacklisted: boolean;
}
