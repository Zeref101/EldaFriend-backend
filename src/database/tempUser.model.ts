import { Document, Schema, model, models } from "mongoose";
import { number, string } from "zod";

export interface ItempUser extends Document {
  fullname: String;
  email: String;
  phone: String;
  password: String;
  otp: Number;
  createdAt: Date;
}

const tempUserSchema = new Schema({
  fullname: { type: string, required: true },
  phone: { type: String, reqired: true, unique: true },
  email: { type: String, reqired: true, unique: true },
  password: { type: String, reqired: true },
  otp: { type: number },
  createdAt: { type: Date, expires: "1m", default: Date.now },
});
const tempUser = models.tempUser || model("tempUser", tempUserSchema);

export default tempUser;
