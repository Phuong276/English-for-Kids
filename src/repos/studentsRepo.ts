import { Request } from "express-validator/src/base";
import prisma from "../utils/db";
import { hashPassword } from "../utils/stringUtils";

export const studentsRepo = {
  findAll: async (pageSize: number, pageIndex: number) => {
    const students = await prisma.user.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      where: {
        isDeleted: false,
      },
    });
    return students;
  },
  findOne: async (id: number) => {
    const student = await prisma.user.findFirst({
      include: {
      },
      where: {
        id: id,
        isDeleted: false,
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
      },
    });
    return student;
  },
};
