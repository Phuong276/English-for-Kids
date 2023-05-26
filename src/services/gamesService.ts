import { Request } from "express-validator/src/base";
import { gamesRepo } from "../repos";

export const gamesService = {
  findAll: async (pageSize: number, pageIndex: number) => {
    const games = await gamesRepo.findAll(pageSize, pageIndex);
    return games;
  },
  update: async (req: Request, id: number) => {
    const game = await gamesRepo.update(req, id);
    return game;
  },
  detail: async (id: number) => {
    const round = await gamesRepo.detail(id);
    return round;
  },
};
