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
        isDeleted: false,
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
        name: req.name,
      },
    });
    return round;
  },
  delete: async (id: number) => {
    const student = await prisma.round.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });
    return student;
  },
  create: async (req: Request) => {
    const round = await prisma.round.create({
      data: {
        name: req.name,
        image: req.image,
        gameId: req.gameId,
      },
    });
    return round;
  },
  findOneByName: async (name: string) => {
    const round = await prisma.round.findFirst({
      where: {
        name: name,
      },
    });
    return round;
  },
};
