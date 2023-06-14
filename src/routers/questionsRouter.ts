import { Router } from "express";
import { questionsController } from "../controllers/questionsController";

const questionsRouter = Router({ mergeParams: true });
questionsRouter.get(
  "/api/rounds/questions/:id",
  questionsController.findQuestionsByIdRound
);
questionsRouter.delete("/api/questions/:id", questionsController.delete);
questionsRouter.get("/api/questions/:id", questionsController.detail);
questionsRouter.put("/api/questions/:id", questionsController.update);
questionsRouter.post("/api/questions", questionsController.create);
questionsRouter.post("/api/answers", questionsController.addAnswers);
questionsRouter.delete("/api/answers/:id", questionsController.deleteAnswers);
questionsRouter.get("/api/answers/:id", questionsController.getAnswers);
questionsRouter.put("/api/answers/:id", questionsController.putAnswers);

export default questionsRouter;
