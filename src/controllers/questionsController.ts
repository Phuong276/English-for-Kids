import { Request, Response } from "express";
import { STATUS } from "../commons";
import { combineMiddleware, handleMiddleware } from "../helpers";
import { questionsService } from "../services/questionsService";

export const questionsController = {
  findQuestionsByIdRound: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const { pageIndex = 1, pageSize = 10 } = req.query;
      const idRound = req.params.id;
      const rounds = await questionsService.findQuestionsByIdRound(
        Number(pageSize),
        Number(pageIndex),
        Number(idRound)
      );
      return res.status(STATUS.OK).json({
        data: rounds,
      });
    })
  ),
};
