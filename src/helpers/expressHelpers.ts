import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { messages } from "../commons";
import { IInformationRequest } from "../dto/IAuthRequestResponse";

export interface IRequest extends Request {
  user?: IInformationRequest;
}

type IMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | unknown;

const isPromise = (maybePromise: unknown) =>
  !!maybePromise &&
  (typeof maybePromise === "object" || typeof maybePromise === "function") &&
  typeof (maybePromise as Promise<unknown>).then === "function";

export const handleMiddleware =
  (middleware: IMiddleware) =>
  (req: Request, res: Response, next: NextFunction) => {
    let maybePromise: unknown;
    try {
      maybePromise = middleware(req, res, next);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Something middleware error",
      });
    }
    const promised = isPromise(maybePromise);
    if (!promised) {
      return;
    }
    const executePromise = async () => {
      try {
        await maybePromise;
      } catch (e) {
        console.log(e);
        res.status(500).json({
          error: "Something promise error",
        });
      }
    };
    return executePromise();
  };

export const combineMiddleware = (...middleWares: IMiddleware[]) => {
  const first = middleWares.length ? middleWares[0] : undefined;

  if (middleWares.length) {
    middleWares.shift();
  }

  return (req: Request, res: Response, next: NextFunction): unknown =>
    first
      ? (first as IMiddleware)(req, res, (err?: unknown) =>
          err ? next(err) : combineMiddleware(...middleWares)(req, res, next)
        )
      : next();
};

export const validationResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

export const isAdminPermission = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user?.role === Role.ADMIN) {
    return next();
  }
  return res.status(403).json({ error: messages.auth.notPermission });
};
