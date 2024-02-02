import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    firstName: string; 
    lastName: string; 
    age: number; 
}

const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
});
 
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
 