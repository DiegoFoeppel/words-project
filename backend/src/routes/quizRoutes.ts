import { Router } from "express";
import { getAll, getRandomWord } from "../controllers/quizController";

const router = Router();

router.get("/", getAll);
router.get("/random", getRandomWord);
// router.get("/filter", getByFilter);

export default router;
