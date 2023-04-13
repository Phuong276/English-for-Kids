import { Request } from "express-validator/src/base";
import { studentsRepo } from "../repos/studentsRepo";

export const studentsService = {
  findAll: async (pageSize: number, pageIndex: number) => {
    const students = await studentsRepo.findAll(pageSize, pageIndex);
    return students;
  },
  findOne: async (id: number) => {
    const student = await studentsRepo.findOne(id);
    return student;
  },
  update: async (req: Request, id: number) => {
    const student = await studentsRepo.update(req, id);
    return student;
  },
  delete: async (id: number) => {
    const student = await studentsRepo.delete(id);
    return student;
  },
};
