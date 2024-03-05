import Medicine, { IMedicine } from "../database/medicine.model";
import { connectToDatabase } from "../lib/mongoose";
import { CreateMedProp, GetCreateMedicineProp } from "../types";
const { differenceInDays } = require("date-fns");

export async function createMedicine({
  userId,
  dosageType,
  medAmount,
  medName,
  duration,
  scheduledTime,
}: GetCreateMedicineProp): Promise<CreateMedProp> {
  try {
    connectToDatabase();

    const now = new Date();
    let scheduledHour;
    try {
      scheduledHour = parseInt(scheduledTime.split(":")[0]);
    } catch (error) {
      console.error(error);
      return {
        error: true,
        status: 400,
        message: "Invalid scheduled time format",
      };
    }

    // * SETTING UP THE MEDCINE START DATE
    let medStartDate;

    if (scheduledHour >= now.getHours()) {
      medStartDate = now;
    } else {
      medStartDate = new Date(now.setDate(now.getDate() + 1));
    }

    // * SETTING UP THE isCompleted field

    const medIsCompletedArray = new Array(duration * 7).fill(false);

    const newMedicine = await Medicine.create({
      userId: userId,
      name: medName,
      dosageType: dosageType,
      dosageAmount: medAmount,
      duration: duration,
      startDate: medStartDate,
      isCompleted: medIsCompletedArray,
      scheduledTime: scheduledTime,
    });

    if (!newMedicine) {
      return {
        error: true,
        status: 500,
        message: `Medicine creation failed`,
      };
    }

    return newMedicine;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: 500,
      message: "Internal server error",
    };
  }
}

interface UpdateIsCompletedProp {
  userId: string;
  medicineId: string;
  setTrueForDate: Date;
  setTrue: boolean;
}
type GetMedicineProp = IMedicine & Document;

export async function updateIsCompleted({
  userId,
  medicineId,
  setTrueForDate,
  setTrue,
}: UpdateIsCompletedProp) {
  try {
    connectToDatabase();
    const med: GetMedicineProp | null = await Medicine.findOne({
      userId,
      _id: medicineId,
    });
    if (med === null) {
      return {
        error: true,
        status: 404,
        message: "Medicine not found",
      };
    }

    // ? Difference between update and startDate
    if (med && med.isCompleted) {
      const index = differenceInDays(setTrueForDate, med.startDate);
      if (index < 0 || index >= med.isCompleted.length) {
        return {
          error: true,
          status: 400,
          message: "Invalid date",
        };
      }
      med.isCompleted[index] = setTrue;
      try {
        await med.save();
        return {
          error: false,
          status: 200,
          message: `Medicine status for today updated`,
        };
      } catch (error) {
        console.log(error);
        return {
          error: true,
          status: 500,
          message: `Internal Server Error while saving the status of medicine`,
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: 500,
      message: `Internal Server Error`,
    };
  }
}
