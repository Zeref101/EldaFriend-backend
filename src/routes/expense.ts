import { Router, Request, Response } from "express";
import { addExpenseSchema } from "../validations/expense.validation";
import { addExpense } from "../services/expense.sevices";
import User from "../database/user.model";

const router = Router();

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
      return res.status(404).json({
        message: "User ID not found",
      });
    }
    const newExpense = await addExpense(userId, itemName, itemPrice);

    if (newExpense.error) {
      res.status(500).send(newExpense.message);
    } else {
      try {
        await User.findByIdAndUpdate(userId, {
          $push: { expenses: newExpense._id },
        });
        return res.status(201).send("Expense Updated successfully");
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to update user with new expense" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add expense" });
  }
});

module.exports = router;
