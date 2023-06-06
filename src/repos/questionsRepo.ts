import { Request } from "express-validator/src/base";
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
        isDeleted: false,
      },
      include: {
        answers: true,
      },
    });
    return questions;
  },
  delete: async (id: number) => {
    const question = await prisma.question.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });
    return question;
  },
  detail: async (id: number) => {
    const question = await prisma.question.findUnique({
      where: {
        id: id,
      },
    });
    return question;
  },
  update: async (req: Request, id: number) => {
    const question = await prisma.question.update({
      where: {
        id: id,
      },
      data: {
        answerText: req.answerText,
        questionText: req.questionText,
        questionAudio: req.questionAudio,
        questionImage: req.questionImage,
      },
    });
    return question;
  },
  create: async (req: Request) => {
    const question = await prisma.question.create({
      data: {
        roundId: req.roundId,
        answerText: req.answerText,
        questionText: req.questionText,
        questionAudio: req.questionAudio,
        questionImage: req.questionImage,
        time: 10,
        point: 10,
      },
    });
    return question;
  },
};
