import { string } from "yup";

export interface IStudentCreateBody {
  username: string;
  password: string;
  name: string;
  userId: number;
  email: string;
  dateOfBirth: Date;
  gender: boolean;
  phoneNumber: string;
}
