import {
  combineMiddleware,
  handleMiddleware,
  isAdminPermission,
} from "../helpers";
import { Request, Response } from "express";
import { gamesService } from "../services";
import { STATUS } from "../commons";

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
};
