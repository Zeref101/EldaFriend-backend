import { z } from "zod";

export const userSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 character long" }),
});

export const userLoginSchema = z.object({
  email: z.string().email({ message: "Email address is missing" }),
  password: z.string().min(2, { message: "Password is missing" }),
});
