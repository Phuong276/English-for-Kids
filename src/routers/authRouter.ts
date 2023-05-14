import { Router } from "express";
import { authController } from "../controllers";

const authRouter = Router({ mergeParams: true });
authRouter.post("/api/login", authController.login);
authRouter.post("/api/register", authController.register);

export default authRouter;
