import { Request, Response } from "express";
import { messages, STATUS } from "../commons";
import {
  combineMiddleware,
  handleMiddleware,
  isAdminPermission,
} from "../helpers";
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
  detail: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const round = await roundsService.detail(id);
      if (!round) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.rounds.notFound,
        });
      }
      return res.status(STATUS.OK).json({
        data: round,
      });
    })
  ),
  update: combineMiddleware(
    isAdminPermission,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const body = req.body;
      const round = await roundsService.update(body, +id);
      return res.status(STATUS.OK).json({
        data: round,
      });
    })
  ),
};
