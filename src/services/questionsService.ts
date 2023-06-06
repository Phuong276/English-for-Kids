import { Request } from "express-validator/src/base";
import { questionRepo } from "../repos/questionsRepo";

export const questionsService = {
  findQuestionsByIdRound: async (
    pageSize: number,
    pageIndex: number,
    idRound: number
  ) => {
    return await questionRepo.findQiestionsByIdRound(
      pageSize,
      pageIndex,
      idRound
    );
  },
  delete: async (id: number) => {
    const question = await questionRepo.delete(id);
    return question;
  },
  detail: async (id: number) => {
    const question = await questionRepo.detail(id);
    return question;
  },
  update: async (req: Request, id: number) => {
    const question = await questionRepo.update(req, id);
    return question;
  },
  create: async (req: Request) => {
    const question = await questionRepo.create(req);
    return question;
  },
};
