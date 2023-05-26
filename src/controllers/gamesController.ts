import {
  combineMiddleware,
  handleMiddleware,
  isAdminPermission,
} from "../helpers";
import { Request, Response } from "express";
import { gamesService } from "../services";
import { messages, STATUS } from "../commons";

export const gamesController = {
  findAll: combineMiddleware(
    // isAdminPermission,
    handleMiddleware(async (req: Request, res: Response) => {
      const { pageIndex = 1, pageSize = 10 } = req.query;
      const games = await gamesService.findAll(
        Number(pageSize),
        Number(pageIndex)
      );
      return res.status(STATUS.OK).json({
        data: games,
      });
    })
  ),
  update: combineMiddleware(
    isAdminPermission,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const body = req.body;
      const student = await gamesService.update(body, +id);
      return res.status(STATUS.OK).json({
        data: student,
      });
    })
  ),
  detail: combineMiddleware(
    isAdminPermission,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const game = await gamesService.detail(id);
      if (!game) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.games.notFound,
        });
      }
      return res.status(STATUS.OK).json({
        data: game,
      });
    })
  ),
};
