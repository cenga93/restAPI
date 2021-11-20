import { Document, Model, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces';

export interface IUserModel extends IUser, Document {
     comparePassword(userPassword: string): Promise<boolean>;
     getPublicFields(): Promise<IUser>;
}

const UserSchema = new Schema(
     {
          firstName: {
               type: String,
               required: true,
          },
          lastName: {
               type: String,
               required: true,
          },
          password: {
               type: String,
               required: true,
          },
          email: {
               type: String,
               required: true,
               unique: true,
          },
          verified: {
               type: Boolean,
               default: false,
          },
          code: {
               type: String,
          },
     },
     {
          timestamps: true,
     }
);

/**
 * Compare password entered by the user and password from database
 *
 * @param userPassword - Entered password
 */
UserSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
     const user: IUser = this as IUserModel;

     return await bcrypt.compare(userPassword, <string>user.password).catch(() => false);
};

/**  Hashing password */
UserSchema.pre('save', async function (next): Promise<void> {
     let user = this;

     /** Only hash the password if it has been modified or if is password is new */
     if (!user.isModified('password')) return next();

     /** Random additional data */
     const salt: string = await bcrypt.genSalt(10);
     user.password = bcrypt.hashSync(user.password, salt);

     return next();
});

/** Get public fields */
UserSchema.methods.getPublicFields = async function (): Promise<IUser> {
     const { firstName, lastName, password, email, verified, _id, createdAt, updatedAt }: IUser = this as IUserModel;
     return { firstName, lastName, password, email, verified, _id, createdAt, updatedAt };
};

const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default User;
