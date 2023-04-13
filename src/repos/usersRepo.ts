import { User } from "@prisma/client";
import { Request } from "express-validator/src/base";
import prisma from "../utils/db";
import { hashPassword } from "../utils/stringUtils";

export const usersRepo = {
  findOneById: async (id: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user as User;
  },
  findOneByUsername: async (username: string) => {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        isDeleted: false,
      },
    });
    return user as User;
  },
  findAll: async (pageSize: number, pageIndex: number) => {
    const users = await prisma.user.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      where: {
        isDeleted: false,
      },
    });
    return users;
  },
  create: async (req: Request) => {
    const hashedPassword = await hashPassword(req.password);
    const user = await prisma.user.create({
      data: {
        username: req.username,
        password: hashedPassword,
        name: req.name,
        role: req.role,
      },
    });
    return user;
  },
  update: async (req: Request, id: number) => {
    const hashedPassword = await hashPassword(req.password);
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: req.name,
        password: hashedPassword,
      },
    });
    return user;
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
