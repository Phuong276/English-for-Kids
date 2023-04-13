import { Request, Response } from "express";
import { messages, STATUS } from "../commons";
import {
  combineMiddleware,
  handleMiddleware,
  isAdminPermission,
} from "../helpers";
import { studentsValidation } from "../middlewares";
import { studentsService } from "../services/studentsService";

export const studentsController = {
  findAll: combineMiddleware(
    isAdminPermission,
    handleMiddleware(async (req: Request, res: Response) => {
      const { pageIndex = 1, pageSize = 10 } = req.query;
      const students = await studentsService.findAll(
        Number(pageSize),
        Number(pageIndex)
      );
      return res.status(STATUS.OK).json({
        data: students,
      });
    })
  ),
  findOne: combineMiddleware(
    isAdminPermission,
    ...studentsValidation.getOne,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = req.params.id;
      const student = await studentsService.findOne(+id);
      if (!student) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.users,
        });
      }
      return res.status(STATUS.OK).json({
        data: student,
      });
    })
  ),
  update: combineMiddleware(
    isAdminPermission,
    ...studentsValidation.getOne,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = req.params.id;
      const body = req.body;
      const check = await studentsService.findOne(+id);
      if (!check) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.users,
        });
      }
      const student = await studentsService.update(body, +id);
      return res.status(STATUS.OK).json({
        data: student,
      });
    })
  ),
  delete: combineMiddleware(
    isAdminPermission,
    ...studentsValidation.getOne,
    handleMiddleware(async (req: Request, res: Response) => {
      const id = req.params.id;
      const check = await studentsService.findOne(+id);
      if (!check) {
        return res.status(STATUS.NOT_FOUND).json({
          error: messages.errors.users,
        });
      }
      const student = await studentsService.delete(+id);
      return res.status(STATUS.OK).json({
        data: student,
      });
    })
  ),
};
