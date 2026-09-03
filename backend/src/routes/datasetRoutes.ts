import { Router } from "express";
import { getAll, getRandomWord } from "../controllers/quizController";
import { getExamples } from "../controllers/datasetController";

const router = Router();

router.get("/", getAll);
router.get("/search", getExamples);

// router.get("/filter", getByFilter);

export default router;
