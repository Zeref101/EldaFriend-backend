import { z } from "zod";

export const createMedSchema = z.object({
  userId: z.string(),
  medName: z.string(),
  dosageType: z.string(),
  medAmount: z.number().min(1, "medAmount cannot be 0 or negative"),
  duration: z.number().min(1, "duration cannot be 0 or negative"),
  scheduledTime: z.string(),
});

export const updateIsCompletedSchema = z.object({
  userId: z.string().min(1, { message: "User ID cannot be empty" }),
  medicineId: z.string().min(1, { message: "Medicine ID cannot be empty" }),
  setTrueForDate: z
    .date()
    .refine((date) => !isNaN(date.getTime()), { message: "Invalid date" }),
  setTrue: z.boolean(),
});
