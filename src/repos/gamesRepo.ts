import { Request } from "express-validator/src/base";
import prisma from "../utils/db";

export const gamesRepo = {
  findAll: async (pageSize: number, pageIndex: number) => {
    const games = await prisma.game.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      where: {
        isDeleted: false,
      },
    });
    return games;
  },
  update: async (req: Request, id: number) => {
    const game = await prisma.game.update({
      where: {
        id: id,
      },
      data: {
        image: req.image,
      },
    });
    return game;
  },
  detail: async (id: number) => {
    const game = await prisma.game.findUnique({
      where: {
        id: id,
      },
    });
    return game;
  },
};
