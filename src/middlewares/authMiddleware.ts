import { validationResultMiddleware } from "../helpers";
import { isNotEmpty } from "../utils/validationUtils";

export const authValidation = {
  login: [
    isNotEmpty("username"),
    isNotEmpty("password"),
    validationResultMiddleware,
  ],
  register: [
    isNotEmpty("username"),
    isNotEmpty("password"),
    isNotEmpty("name"),
    isNotEmpty("role"),
    validationResultMiddleware,
  ]
  // roleNotNull: [isNotEmpty("role"), validationResultMiddleware],
  // registerAdmin: [
  //   isNotEmpty("username"),
  //   isNotEmpty("password"),
  //   isNotEmpty("name"),
  //   validationResultMiddleware,
  // ],
  // registerStudent: [
  //   isNotEmpty("gender"),
  //   isNotEmpty("dateOfBirth"),
  //   isNotEmpty("phoneNumber"),
  //   isNotEmpty("email"),
  //   validationResultMiddleware,
  // ],
};
