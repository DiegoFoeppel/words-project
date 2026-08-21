import { Router } from "express";
import {
  getAll,
  getById,
  createSentence,
  editSentence,
  deleteSentence,
  getByFilter,
} from "../controllers/wordsController";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/filter", getByFilter);
router.post("/", createSentence);
router.put("/:id", editSentence);
router.delete("/:id", deleteSentence);

export default router;
