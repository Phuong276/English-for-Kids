import { Role, TeacherStatus } from "@prisma/client";
import { string } from "yup";

export interface IStudentCreateBody {
  username: string;
  password: string;
  name: string;
  role: Role;
  userId: number;
  email: string;
  dateOfBirth: Date;
  gender: boolean;
  phoneNumber: string;
}
