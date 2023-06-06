import { Request, Response } from "express";
import { messages, STATUS } from "../commons";
import {
  combineMiddleware,
  handleMiddleware,
  isAdminPermission,
} from "../helpers";
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
  delete: combineMiddleware(
    isAdminPermission,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const question = await questionsService.delete(id);
      return res.status(STATUS.OK).json({
        data: question,
      });
    })
  ),
  detail: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const question = await questionsService.detail(id);
      if (!question) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.questions.notFound,
        });
      }
      return res.status(STATUS.OK).json({
        data: question,
      });
    })
  ),
  update: combineMiddleware(
    isAdminPermission,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = +req.params.id;
      const body = req.body;
      const question = await questionsService.update(body, +id);
      return res.status(STATUS.OK).json({
        data: question,
      });
    })
  ),
  create: combineMiddleware(
    isAdminPermission,
    handleMiddleware(async (req: Request, res: Response) => {
      const body = req.body;
      const question = await questionsService.create(body);
      return res.status(200).json({
        data: {
          question,
        },
      });
    })
  ),
};
