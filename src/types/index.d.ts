export interface CreateUserParams {
  fullname: string;
  email: string;
  phone: string;
  password: string;
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

export interface CreateMedicineProp {
  userId: string;
  dosageType: string;
  medName: string;
  medAmount: number;
  duration: number;
  scheduledTime: string;
}
