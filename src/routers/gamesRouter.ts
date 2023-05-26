import { Router } from "express";
import { gamesController } from "../controllers";

const gamesRouter = Router({ mergeParams: true });
gamesRouter.get("/api/games", gamesController.findAll);
gamesRouter.put("/api/games/:id", gamesController.update);
gamesRouter.get("/api/games/:id", gamesController.detail);

export default gamesRouter;
