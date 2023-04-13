import { User } from "@prisma/client";
import { Response } from "express";
import { Request } from "express-validator/src/base";
import { STATUS } from "../commons";
import {
  IStudentCreateBody,
} from "../dto/IUserRequestResponse";
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
        username,
      },
    });
    return user as User;
  },

  registerAdmin: async (req: Request) => {
    const hashedPassword = await hashPassword(req.password);
    const user = await prisma.user.create({
      data: {
        username: req.username,
        password: hashedPassword,
        name: req.name,
      },
    });
    return user;
  },

  registerStudent: async (req: Request, res: Response) => {
    const hashedPassword = await hashPassword(req.password);
    const student = await prisma
      .$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            username: req.username,
            password: hashedPassword,
            name: req.name,
          },
        });
      })
      .catch((err) => {
        return res.status(STATUS.NOT_FOUND).json({ error: err });
      });
    return student;
  },
};
