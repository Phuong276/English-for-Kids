import { Request, Response } from "express";
import { accessToken, decodeToken, refreshToken } from "../utils/tokenUtils";
import { STATUS, messages } from "../commons";
import { combineMiddleware, handleMiddleware } from "../helpers";
import { User } from "@prisma/client";
import { usersService } from "../services";
import { comparePassword } from "../utils/stringUtils";
import { authValidation } from "../middlewares/authMiddleware";

export const authController = {
  login: combineMiddleware(
    ...authValidation.login,
    handleMiddleware(async (req: Request, res: Response) => {
      const body = req.body;
      const user = await usersService.findOneByUsername(body.username);
      if (!user) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ error: messages.errors.users.notFound });
      }
      const checkPass = await comparePassword(user.password, body.password);
      if (!checkPass) {
        return res.status(400).json({ message: messages.auth.passwordInvalid });
      }
      const { password, ...newUser } = user;
      const token = await accessToken(newUser as User);
      const refresh = await refreshToken(user.id);
      return res.status(STATUS.OK).json({
        data: {
          token: token,
          refresh: refresh,
        },
      });
    })
  ),
  register: combineMiddleware(
    ...authValidation.register,
    handleMiddleware(async (req: Request, res: Response) => {
      const body = req.body;
      const checkUser = await usersService.findOneByUsername(body.username);
      if (checkUser) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ error: messages.errors.users.exist });
      }
      const user = await usersService.register(body);
      return res.status(200).json({
        data: {
          user,
        },
      });
    })
  ),
  refreshToken: combineMiddleware(
    handleMiddleware(async (req: Request, res: Response) => {
      const decode = decodeToken(req.body.refreshToken);
      if (!decode) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ error: messages.errors.users.notFound });
      }
      const user = await usersService.findOneById(decode.id);
      const { password, ...newUser } = user;
      const token = await accessToken(newUser as User);

      return res.status(STATUS.OK).json({
        data: {
          token: token,
        },
      });
    })
  ),
};
