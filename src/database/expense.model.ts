import { Schema, model, models, Document } from "mongoose";

export interface IExpense extends Document {
  userId: Schema.Types.ObjectId;
  itemName: string;
  itemPrice: number;
  createdAt: Date;
}

const ExpenseSchema = new Schema<IExpense>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  itemName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Expense = models.Expense || model("Expense", ExpenseSchema);

export default Expense;
