import { Request, Response } from "express";
import { messages, STATUS } from "../commons";
import {
  combineMiddleware,
  handleMiddleware,
  isAdminPermission,
} from "../helpers";
import { usersValidation } from "../middlewares/usersMiiddleware";
import { usersService } from "../services";

export const usersController = {
  detail: combineMiddleware(
    isAdminPermission,
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
    isAdminPermission,
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
    isAdminPermission,
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
      const student = await usersService.update(body, +id);
      return res.status(STATUS.OK).json({
        data: student,
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
};
