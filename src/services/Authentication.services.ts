import User from "../database/user.model";
import { connectToDatabase } from "../lib/mongoose";
import { CreateUserAltResponse, CreateUserParams } from "../types";

export async function createUser({
  fullname,
  email,
  phone,
  password,
}: CreateUserParams): Promise<CreateUserParams | CreateUserAltResponse> {
  try {
    connectToDatabase();

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return {
          error: true,
          status: 409,
          message: "Email already exists",
        };
      } else {
        return {
          error: true,
          status: 409,
          message: "Phone number already exists",
        };
      }
    }

    const user: any = await User.create({
      fullname: fullname,
      email: email,
      phone: phone,
      password: password,
    });

    if (!user) {
      return {
        error: true,
        status: 500,
        message: `User not created due to an Internal server error`,
      };
    }

    return user;
  } catch (err) {
    console.error(err);
    return {
      error: true,
      status: 500,
      message: "Internal server error",
    };
  }
}
