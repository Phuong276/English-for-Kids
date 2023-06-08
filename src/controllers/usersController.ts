import { Request, Response } from "express";
import { messages, STATUS } from "../commons";
import { IInfoUser, IPointUser } from "../commons/common";
import {
  combineMiddleware,
  handleMiddleware,
  isAdminPermission,
} from "../helpers";
import { usersValidation } from "../middlewares/usersMiiddleware";
import { usersService } from "../services";

export const usersController = {
  detail: combineMiddleware(
    ...usersValidation.detail,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const user = await usersService.findOneById(id);
      if (!user) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.users,
        });
      }
      return res.status(STATUS.OK).json({
        data: user,
      });
    })
  ),
  findAll: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const { pageIndex = 1, pageSize = 10 } = req.query;
      const users = await usersService.findAll(
        Number(pageSize),
        Number(pageIndex)
      );
      return res.status(STATUS.OK).json({
        data: users,
      });
    })
  ),
  update: combineMiddleware(
    ...usersValidation.detail,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const body = req.body;
      const check = await usersService.findOneById(id);
      if (!check) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.users,
        });
      }
      const user = await usersService.update(body, +id);
      return res.status(STATUS.OK).json({
        data: user,
      });
    })
  ),
  delete: combineMiddleware(
    isAdminPermission,
    ...usersValidation.detail,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const check = await usersService.findOneById(id);
      if (!check) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.users,
        });
      }
      const user = await usersService.delete(id);
      return res.status(STATUS.OK).json({
        data: user,
      });
    })
  ),
  infor: combineMiddleware(
    ...usersValidation.detail,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const user = await usersService.infor(id);
      if (!user) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.users,
        });
      }
      let totalPoints = 0;
      let totalQuestions = 0;
      let rank = 0;
      user.points.map((item) => {
        totalPoints += item.question.point;
        totalQuestions += 1;
      });

      const points = await usersService.getPointUser();
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

      for (let i = 0; i < pointusers.length; i++) {
        rank += 1;
        if (pointusers[i].username === user.username) break;
      }

      const infor: IInfoUser = {
        id: id,
        name: user.name,
        username: user.username,
        totalPoints: totalPoints,
        totalQuestions: totalQuestions,
        dateJoin: user.createdAt,
        rank: rank,
      };

      return res.status(STATUS.OK).json({
        data: infor,
      });
    })
  ),
};
