import { body, param, query } from "express-validator";

export const isNotEmpty = (property: string, message?: string) => {
  return body(property, message ?? `"${property}" must not empty'`).notEmpty();
};
