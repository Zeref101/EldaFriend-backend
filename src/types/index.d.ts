import { ObjectId } from "mongoose";
import { IMedicine } from "../database/medicine.model";

export interface CreateUserParams {
  fullname: string;
  email: string;
  phone: string;
  password: string;
}
export interface CreateUserResponse {
  _id: string;
}

export interface GetUserProp {
  fullname: string;
  phone: string;
  email: string;
  password: string;
  picture: string;
  globalPin: number;
  communities: {
    communityId: ObjectId;
    isAdmin: boolean;
  }[];
  medicines: ObjectId[];
  expenses: ObjectId[];
  otp: number;
  verified: boolean;
}
export interface Error {
  error: boolean;
  status: number;
  message: string;
}
export interface CreateUserAltResponse {
  error: boolean;
  status: number;
  message: string;
}

export interface NewUser {
  fullname: string;
  phone: string;
  email: string;
  password: string;
  picture?: string;
  groups?: string[];
  medicines?: string[];
  expenses?: string[];
}

export interface GetCreateMedicineProp {
  userId: string;
  dosageType: string;
  medName: string;
  medAmount: number;
  duration: number;
  scheduledTime: string;
}
export interface GetAllMedsProp {
  name: string;
  dosageType: string;
  dosageAmount: number;
  scheduledTime: string;
}
export interface UpdateIsCompletedProp {
  userId: string;
  medicineId: string;
  setTrueForDate: Date;
  setTrue: boolean;
}
export type GetMedicineProp = IMedicine & Document;

export interface CreateAlternateProp {
  error: boolean;
  status: number;
  message: string;
}

export interface CreateMedProp {
  _id?: string;
  userId?: string;
  dosageType?: string;
  medName?: string;
  medAmount?: number;
  duration?: number;
  scheduledTime?: string;
  error?: boolean;
  status?: number;
  message?: string;
}

// export interface GetMedicineProp {
//   _id?: string;
//   userId?: string;
//   name?: string;
//   dosageType?: string;
//   dosageAmount?: number;
//   startDate?: Date;
//   duration?: number;
//   isCompleted?: [boolean];
//   scheduledTime?: string;
// }

export interface ExpenseProp {
  _id?: string;
  userId?: string;
  itemName?: string;
  itemPrice?: number;
  createdAt?: Date;
  error?: boolean;
  status?: number;
  message?: string;
}

export interface GetPropsForCommunity {
  adminUserid: string;
  name: string;
  description: string;
  picture: string;
  banner?: string;
}

export interface CreateCommunityProp {
  _id?: string;
  adminUserid?: string;
  name?: string;
  description?: string;
  picture?: string;
  banner?: string;
  error?: boolean;
  status?: number;
  message?: string;
}
