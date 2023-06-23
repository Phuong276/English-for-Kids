import { Request, Response } from "express";
import { STATUS } from "../commons";
import { IPointUser } from "../commons/common";
import { combineMiddleware, handleMiddleware } from "../helpers";
import { pointsService } from "../services/pointsService";

export const pointsController = {
  upsetPoint: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const body = req.body;
      const check = await pointsService.getPoint(
        Number(body.userId),
        Number(body.questionId)
      );

      if (check) {
        const point = await pointsService.updatePointStatus(body, check.id);
        return res.status(STATUS.OK).json({
          data: {
            point,
          },
        });
      }

      const point = await pointsService.createPoint(body);
      return res.status(STATUS.OK).json({
        data: {
          point,
        },
      });
    })
  ),
  getPoint: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const { userId, questionId } = req.query;
      const point = await pointsService.getPoint(
        Number(userId),
        Number(questionId)
      );
      return res.status(STATUS.OK).json({
        data: {
          point,
        },
      });
    })
  ),
  updatePointStatus: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const id = req.params.id;
      const body = req.body;
      const point = await pointsService.updatePointStatus(body, Number(id));
      return res.status(STATUS.OK).json({
        data: {
          point,
        },
      });
    })
  ),
  getPointUser: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const points = await pointsService.getPointUser();
      const pointusers: IPointUser[] = [];
      points.map((item) => {
        const pointuser: IPointUser = {
          username: item.username,
          point: 0,
        };
        item.points.map((item) => {
          pointuser.point += item.question.point;
        });
        pointusers.push(pointuser);
      });
      pointusers.sort((a, b) => {
        return b.point - a.point;
      });
      pointusers.splice(10);
      return res.status(STATUS.OK).json({
        data: { pointusers },
      });
    })
  ),
};
