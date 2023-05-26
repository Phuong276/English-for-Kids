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
};
