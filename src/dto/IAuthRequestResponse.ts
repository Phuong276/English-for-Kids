import { Role } from "@prisma/client";

export interface IInformationRequest {
  id?: number;
  username?: string;
  name?: string;
  role?: Role;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
