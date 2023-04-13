import { param } from "express-validator";
import { validationResultMiddleware } from "../helpers";

export const usersValidation = {
  detail: [param("id").isInt(), validationResultMiddleware],
};
