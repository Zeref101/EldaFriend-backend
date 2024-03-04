import express, { Request, Response } from "express";
import { addExpenseSchema } from "../validations/expense.validation";
import { addExpense } from "../services/expense.sevices";

const router = express.Router();

router.post("/add-expense", async (req: Request, res: Response) => {
  const result = addExpenseSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues.map((issue) => issue.message).join(","),
    });
  }

  const { userId, itemName, itemPrice } = result.data;

  try {
    if (!userId) {
      res.status(404).json({
        message: "User ID not found",
      });
    }
    const newExpense = await addExpense(userId, itemName, itemPrice);

    res.status(201).json({
      message: "Expense added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add expense" });
  }
});

export default router;
