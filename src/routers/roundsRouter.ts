import { Router } from "express";
import { roundsController } from "../controllers/roundsController";

const roundsRouter = Router({ mergeParams: true });
roundsRouter.get("/api/games/rounds/:id", roundsController.findRoundsByIdGame);
roundsRouter.get("/api/rounds/:id", roundsController.detail);
roundsRouter.put("/api/rounds/:id", roundsController.update);
roundsRouter.delete("/api/rounds/:id", roundsController.delete);
roundsRouter.post("/api/rounds", roundsController.create);

export default roundsRouter;
