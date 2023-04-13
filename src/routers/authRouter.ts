import { Router } from "express";
import { authController } from "../controllers";

const authRouter = Router({ mergeParams: true });
authRouter.get("/api/login", authController.login);
authRouter.post("/api/register/admin", authController.registerAdmin);
authRouter.post("/api/register/student", authController.registerStudent);
authRouter.post("/api/refresh", authController.refreshToken);

export default authRouter;
