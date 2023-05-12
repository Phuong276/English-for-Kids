import { roundsRepo } from "../repos/roundsRepo";

export const roundsService = {
  findRoundsByIdGame: async (
    pageSize: number,
    pageIndex: number,
    idGame: number
  ) => {
    return await roundsRepo.findRoundsByIdGame(pageSize, pageIndex, idGame);
  },
};
