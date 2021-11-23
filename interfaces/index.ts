export interface IUser {
     _id?: any;
     firstName: string | undefined;
     lastName: string | undefined;
     email: string | undefined;
     password: string | undefined;
     createdAt: Date;
     updatedAt: Date;
     code?: string;
     verified: boolean;
     role: string;
     _doc?: Object;
}

export interface IFilter {
     _id?: string;
     email?: string;
     verified?: boolean;
     code?: string;
}

export interface ISelect {
     code?: boolean;
}

export interface IProduct {
     title: string;
     description: string;
     userId: string;
     createdAt: Date;
     updatedAt: Date;
}

export interface IToken {
     access: {
          token?: string;
          expires?: Date;
     };
     refresh: {
          token?: string;
          expires?: Date;
     };
}
