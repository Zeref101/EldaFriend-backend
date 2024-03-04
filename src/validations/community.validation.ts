import { z } from "zod";

export const createCommunitySchema = z.object({
  adminUserId: z.string().min(1, { message: "User ID cannot be empty" }),
  name: z.string().min(1, { message: "Name cannot be empty" }),
  description: z.string().min(1, { message: "Description cannot be empty" }),
  picture: z.string().min(1, { message: "Picture cannot be empty" }),
  banner: z.string().optional(),
});
