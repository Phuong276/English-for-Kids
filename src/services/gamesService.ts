import { gamesRepo } from "../repos";

export const gamesService = {
  findAll: async (pageSize: number, pageIndex: number) => {
    const games = await gamesRepo.findAll(pageSize, pageIndex);
    return games;
  },
};
