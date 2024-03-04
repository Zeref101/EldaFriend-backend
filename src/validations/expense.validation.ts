import { z } from "zod";

export const addExpenseSchema = z.object({
  userId: z.string(),
  itemName: z.string().min(1, { message: `item cannot be unnamed` }),
  itemPrice: z.number().min(0, { message: "itemPrice cannot be negative" }),
});
