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
  findAll: async (pageSize: number, pageIndex: number) => {
    const users = await usersRepo.findAll(pageSize, pageIndex);
    return users;
  },
  register: async (req: Request) => {
    const user = await usersRepo.create(req);
    return user;
  },
  update: async (req: Request, id: number) => {
    const user = await usersRepo.update(req, id);
    return user;
  },
  delete: async (id: number) => {
    const user = await usersRepo.delete(id);
    return user;
  },
};
