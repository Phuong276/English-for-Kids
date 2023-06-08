import { Router } from "express";
import { usersController } from "../controllers/usersController";

const usersRouter = Router({ mergeParams: true });
usersRouter.get("/api/users/:id", usersController.detail);
usersRouter.get("/api/users", usersController.findAll);
usersRouter.put("/api/users/:id", usersController.update);
usersRouter.delete("/api/users/:id", usersController.delete);
usersRouter.get("/api/info-users/:id", usersController.infor);

export default usersRouter;
