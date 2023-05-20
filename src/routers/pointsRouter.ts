import { Router } from "express";
import { pointsController } from "../controllers";

const pointsRouter = Router({ mergeParams: true });
pointsRouter.post("/api/points", pointsController.upsetPoint);
pointsRouter.get("/api/points", pointsController.getPoint);
pointsRouter.put("/api/points/:id", pointsController.updatePointStatus);

export default pointsRouter;
