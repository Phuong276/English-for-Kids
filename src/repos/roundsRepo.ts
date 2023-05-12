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
          gameId: idGame
        },
    });
    return rounds;
  },
};
