import { Request } from "express-validator/src/base";
import { pid } from "process";
import { pointsRepo } from "../repos/pointsRepo";

export const pointsService = {
  createPoint: async (req: Request) => {
    const point = await pointsRepo.createPoint(req);
    return point;
  },
  getPoint: async (userId: number, questionId: number) => {
    const point = await pointsRepo.getPoint(userId, questionId);
    return point;
  },
  updatePointStatus: async (req: Request, id: number) => {
    const point = await pointsRepo.updatePointStatus(req, id);
    return point;
  },
  getPointUser: async () => {
    const points = await pointsRepo.getPointUser();
    return points;
  },
};
