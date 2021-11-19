export interface IUser {
     firstName: string | undefined;
     lastName: string | undefined;
     email: string | undefined;
     password?: string | undefined;
     createdAt?: Date;
     updatedAt?: Date;
     code?: string;
}
