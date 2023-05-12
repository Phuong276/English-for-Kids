import { Request, Response } from "express";
import { STATUS } from "../commons";
import { combineMiddleware, handleMiddleware } from "../helpers";
import { roundsService } from "../services/roundsService";

export const roundsController = {
  findRoundsByIdGame: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const { pageIndex = 1, pageSize = 10 } = req.query;
      const idGame = req.params.id;
      const rounds = await roundsService.findRoundsByIdGame(
        Number(pageSize),
        Number(pageIndex),
        Number(idGame)
      );
      return res.status(STATUS.OK).json({
        data: rounds,
      });
    })
  ),
};
