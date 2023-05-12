import { Router } from "express";
import { roundsController } from "../controllers/roundsController";

const roundsRouter = Router({ mergeParams: true });
roundsRouter.get("/api/games/:id", roundsController.findRoundsByIdGame);

export default roundsRouter;
