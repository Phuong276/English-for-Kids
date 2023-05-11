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
};
