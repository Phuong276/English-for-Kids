import prisma from "../utils/db";

export const questionRepo = {
  findQiestionsByIdRound: async (
    pageSize: number,
    pageIndex: number,
    idRound: number
  ) => {
    const questions = await prisma.question.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      where: {
        roundId: idRound,
      },
      include: {
        answers: true,
      },
    });
    return questions;
  },
};
