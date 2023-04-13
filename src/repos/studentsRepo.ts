import { Role } from "@prisma/client";
import { Request } from "express-validator/src/base";
import prisma from "../utils/db";
import { hashPassword } from "../utils/stringUtils";

export const studentsRepo = {
  findAll: async (pageSize: number, pageIndex: number) => {
    const students = await prisma.user.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      include: {
        student: true,
      },
      where: {
        isDeleted: false,
        role: Role.STUDENT,
      },
    });
    return students;
  },
  findOne: async (id: number) => {
    const student = await prisma.user.findFirst({
      include: {
        student: true,
      },
      where: {
        id: id,
        isDeleted: false,
        role: Role.STUDENT,
      },
    });
    return student;
  },
  update: async (req: Request, id: number) => {
    const hashedPassword = await hashPassword(req.password);
    const student = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: req.name,
        password: hashedPassword,
        student: {
          update: {
            dateOfBirth: new Date(req.dateOfBirth),
            email: req.email,
            gender: req.gender,
            phoneNumber: req.phoneNumber,
          },
        },
      },
    });
    return student;
  },
  delete: async (id: number) => {
    const student = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
        role: Role.STUDENT,
      },
    });
    return student;
  },
};
