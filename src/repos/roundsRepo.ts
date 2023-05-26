import { Request } from "express-validator/src/base";
import prisma from "../utils/db";

export const roundsRepo = {
  findRoundsByIdGame: async (
    pageSize: number,
    pageIndex: number,
    idGame: number
  ) => {
    const rounds = await prisma.round.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      where: {
        gameId: idGame,
      },
    });
    return rounds;
  },
  detail: async (id: number) => {
    const round = await prisma.round.findUnique({
      where: {
        id: id,
      },
    });
    return round;
  },
  update: async (req: Request, id: number) => {
    const round = await prisma.round.update({
      where: {
        id: id,
      },
      data: {
        image: req.image,
      },
    });
    return round;
  },
};
