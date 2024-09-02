import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for User document
export interface IUser extends Document {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
}
// Create the User schema
const UserSchema: Schema = new Schema(
  {
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      unique: true,
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
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
