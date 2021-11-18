import { Document, Model, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user';

export interface IUserModel extends IUser, Document {
     comparePassword(userPassword: string): Promise<boolean>;
     getCollectionName(): string;
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
     },
     {
          timestamps: true,
     }
);

/**
 *  Compare passwords
 *a
 * @param userPassword
 * @return boolean
 */
UserSchema.methods.comparePassword = async function (userPassword: string) {
     const user = this as IUserModel;

     return bcrypt.compare(userPassword, user.password).catch(() => false);
};

UserSchema.methods.getCollectionName = function () {
     return 'testiranje';
};

UserSchema.pre('save', async function (next): Promise<void> {
     let user = this;

     /** Only hash the password if it has been modified or if is password is new */
     if (!user.isModified('password')) return next();

     /** Random additional data */
     const salt: string = await bcrypt.genSalt(10);
     user.password = bcrypt.hashSync(user.password, salt);

     return next();
});

const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default User;
