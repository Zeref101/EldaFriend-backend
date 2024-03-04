import Expense from "../database/expense.model";
import { connectToDatabase } from "../lib/mongoose";
import { ExpenseProp } from "../types";

export async function addExpense(
  userId: string,
  itemName: string,
  itemPrice: number
): Promise<ExpenseProp> {
  try {
    connectToDatabase();
    const expense = await Expense.create({
      userId,
      itemName,
      itemPrice,
      createdAt: Date.now(),
    });

    if (!expense) {
      return {
        error: true,
        status: 500,
        message: `Expense failed to add`,
      };
    } else {
      return expense;
    }
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: "Internal server error",
    };
  }
}
