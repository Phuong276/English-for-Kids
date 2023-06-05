import { Request } from "express-validator/src/base";
import { roundsRepo } from "../repos/roundsRepo";

export const roundsService = {
  findRoundsByIdGame: async (
    pageSize: number,
    pageIndex: number,
    idGame: number
  ) => {
    return await roundsRepo.findRoundsByIdGame(pageSize, pageIndex, idGame);
  },
  detail: async (id: number) => {
    const round = await roundsRepo.detail(id);
    return round;
  },
  update: async (req: Request, id: number) => {
    const round = await roundsRepo.update(req, id);
    return round;
  },
  delete: async (id: number) => {
    const round = await roundsRepo.delete(id);
    return round;
  },
  create: async (req: Request) => {
    const round = await roundsRepo.create(req);
    return round;
  },
  findOneByName: async (name: string) => {
    return await roundsRepo.findOneByName(name);
  },
};
