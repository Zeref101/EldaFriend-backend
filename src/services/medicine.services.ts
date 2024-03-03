import Medicine from "../database/medicine.model";
import { connectToDatabase } from "../lib/mongoose";
import { CreateAlternateProp, CreateMedicineProp } from "../types";

export async function createMedicine({
  userId,
  dosageType,
  medAmount,
  medName,
  duration,
  scheduledTime,
}: CreateMedicineProp): Promise<CreateAlternateProp> {
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

    return {
      error: false,
      status: 200,
      message: `Medicine creation successfull`,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: 500,
      message: "Internal server error",
    };
  }
}
