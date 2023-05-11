import { Router } from "express";
import { gamesController } from "../controllers";

const gamesRouter = Router({ mergeParams: true });
gamesRouter.get("/api/games", gamesController.findAll);

export default gamesRouter;
