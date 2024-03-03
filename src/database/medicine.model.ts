import { Schema, model, models, Document } from "mongoose";
export interface IMedicine extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  dosageType: string;
  dosageAmount: number;
  duration: number;
  startDate: Date;
  isCompleted: boolean[];
  scheduledTime: string;
}

const MedicineSchema = new Schema<IMedicine>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  dosageType: { type: String, required: true },
  dosageAmount: { type: Number, required: true },
  startDate: { type: Date, required: true, default: Date.now },
  duration: { type: Number, required: true },
  isCompleted: { type: [Boolean], required: true },
  scheduledTime: { type: String, required: true },
});

const Medicine = models.Medicine || model("Medicine", MedicineSchema);

export default Medicine;
