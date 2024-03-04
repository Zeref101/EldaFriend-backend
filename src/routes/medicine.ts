import { Request, Response, Router } from "express";
import { createMedicine } from "../services/medicine.services";
import { createMedSchema } from "../validations/medicine.validation";
import User from "../database/user.model";

const router = Router();

router.post("/create-med", async (req: Request, res: Response) => {
  try {
    const result = createMedSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues.map((issue) => issue.message).join(","),
      });
    }

    const { userId, dosageType, medAmount, medName, duration, scheduledTime } =
      result.data;

    const newMedicine = await createMedicine({
      userId,
      dosageType,
      medAmount,
      medName,
      duration,
      scheduledTime,
    });

    if (newMedicine.error) {
      return res.status(400).json({ message: newMedicine.error });
    }
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { medicines: newMedicine._id },
      });
      return res.status(201).json({
        message: "Medicine created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to create Medicine",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
