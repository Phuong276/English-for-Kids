import prisma from "../utils/db";
import { Request } from "express-validator/src/base";
import { Role } from "@prisma/client";

export const pointsRepo = {
  createPoint: async (req: Request) => {
    const point = await prisma.point.create({
      data: {
        satus: req.status,
        userId: req.userId,
        questionId: req.questionId,
      },
    });
    return point;
  },
  getPoint: async (userId: number, questionId: number) => {
    const point = await prisma.point.findFirst({
      where: {
        userId: userId,
        questionId: questionId,
      },
    });
    return point;
  },
  updatePointStatus: async (req: Request, id: number) => {
    const point = await prisma.point.update({
      where: {
        id: id,
      },
      data: {
        satus: req.status,
      },
    });
    return point;
  },
  getPointUser: async () => {
    const points = await prisma.user.findMany({
      skip: 0,
      take: 10,
      where: {
        role: Role.USER,
        isDeleted: false,
      },
      include: {
        points: {
          select: {
            question: {
              select: {
                point: true,
              },
            },
          },
        },
      },
    });
    return points;
  },
};
