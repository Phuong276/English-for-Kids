import { Role } from "@prisma/client";
import { Response } from "express";
import { Request } from "express-validator/src/base";
import { usersRepo } from "../repos";

export const usersService = {
  findOneById: async (id: number) => {
    return await usersRepo.findOneById(id);
  },

  findOneByUsername: async (username: string) => {
    return await usersRepo.findOneByUsername(username);
  },

  register: async (req: Request, res: Response) => {
    let user;
    switch (req.role) {
      case Role.ADMIN:
        user = await usersRepo.registerAdmin(req);
        break;
      case Role.STUDENT:
        user = await usersRepo.registerStudent(req, res);
        break;
    }
    return user;
  },
};
