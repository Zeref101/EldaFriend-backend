import { connectToDatabase } from "../lib/mongoose";
import User from "../database/user.model";
import {
  getAllUsersWithMedName,
  getUserMedicineNames,
} from "./medicine.services";
import { Error, GetSimilarUsersProp } from "../types";

export async function getAllUsersWithSameMeds(userId: string) {
  try {
    connectToDatabase();
    const meds = await getUserMedicineNames(userId);

    if ("error" in meds) {
      return {
        error: true,
        status: meds.status,
        message: meds.message,
      };
    } else {
      if (meds.length > 0) {
      }
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function getSimilarUsers(
  medName: string
): Promise<GetSimilarUsersProp[] | Error> {
  try {
    connectToDatabase();

    const users = await getAllUsersWithMedName(medName);

    if ("error" in users) {
      return {
        error: true,
        status: users.status,
        message: users.message,
      };
    } else {
      if (users.length > 0) {
        const userList = await User.find({ _id: { $in: users } }).select(
          "fullname phone email"
        );
        return userList;
      }
      return [];
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: 500,
      message: "Internal Server Error while fetching Users",
    };
  }
}
