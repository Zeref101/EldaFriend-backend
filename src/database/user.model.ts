import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  phone: string;
  email: string;
  password: string;
  picture: string;
  groups: Schema.Types.ObjectId[];
  medicines: Schema.Types.ObjectId[];
  expenses: Schema.Types.ObjectId[];
  otp: number;
  verified: boolean;
}

const UserSchema = new Schema({
  fullname: { type: String, reqired: true },
  phone: { type: String, reqired: true, unique: true },
  email: { type: String, reqired: true, unique: true },
  password: { type: String, reqired: true },
  picture: { type: String },
  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  medicines: [{ type: Schema.Types.ObjectId, ref: "Medicine" }],
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
  otp: { type: Number },
  verified: { type: Boolean, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;
