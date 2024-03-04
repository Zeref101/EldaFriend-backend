import Expense from "../database/expense.model";

export async function addExpense(
  userId: string,
  itemName: string,
  itemPrice: number
) {
  try {
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
      return {
        error: false,
        status: 200,
        message: `Expense successfully added`,
      };
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
