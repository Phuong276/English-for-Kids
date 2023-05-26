import { Router } from "express";
import { questionsController } from "../controllers/questionsController";

const questionsRouter = Router({ mergeParams: true });
questionsRouter.get("/api/rounds/questions/:id", questionsController.findQuestionsByIdRound);

export default questionsRouter;
