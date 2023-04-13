import { Router } from "express";
import { studentsController } from "../controllers/studentsController";

const studentsRouter = Router({ mergeParams: true });
studentsRouter.get("/api/students", studentsController.findAll);
studentsRouter.get("/api/students/:id", studentsController.findOne);
studentsRouter.put("/api/students/:id", studentsController.update);
studentsRouter.delete("/api/students/:id", studentsController.delete);

export default studentsRouter;
