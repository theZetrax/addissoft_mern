import { Document, model, Schema } from 'mongoose';

export enum Gender {
    Male = 1,
    Female = 0
}

interface IUserDocument extends Document {
    name: string;
    birth_date: Date;
    gender: Gender;
    salary: string;
}

export interface User extends IUserDocument {}

const UserSchema = new Schema<User>({
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

UserSchema.methods.getGender = function (this: IUserDocument) {
    return this.gender > 0 ? "Male" : "Female";
}

export default model<User>("User", UserSchema);
