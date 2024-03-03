import { z } from "zod";

export const createMedSchema = z.object({
  userId: z.string(),
  medName: z.string(),
  dosageType: z.string(),
  medAmount: z.number().min(1, "medAmount cannot be 0 or negative"),
  duration: z.number().min(1, "duration cannot be 0 or negative"),
  scheduledTime: z.string(),
});
