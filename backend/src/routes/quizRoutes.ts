import { Router } from "express";
import {
  deleteExample,
  getAll,
  getRandomWord,
  getWordById,
  updateExample,
} from "../controllers/quizController";

const router = Router();

router.get("/", getAll);
router.get("/random", getRandomWord);
router.get("/:id", getWordById);
router.patch("/:id", updateExample);
router.delete("/:id", deleteExample);

export default router;
