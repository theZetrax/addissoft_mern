/**
 * User Model.
 * 
 * @author Zablon Dawit
 */
import { Document, model, Schema } from 'mongoose';

export enum Gender {
    Male = 1,
    Female = 0
}

export interface User {
    name: string;
    birth_date: Date;
    gender: Gender;
    salary: string;
}

export interface UserDocument extends Document, User {}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    birth_date: { type: Date, default: Date.now },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0,
        required: true
    },
    salary: { type: String, required: true }
});

UserSchema.methods.getGender = function (this: User) {
    return this.gender > 0 ? "Male" : "Female";
}

export default model<UserDocument>("User", UserSchema);
