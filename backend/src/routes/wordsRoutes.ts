import { Router } from "express";
import {
  getAll,
  getById,
  addWord,
  editWord,
  deleteWord,
  getByFilter,
} from "../controllers/wordsController";

const router = Router();

router.get("/", getAll);
router.get("/filter", getByFilter);
router.get("/:id", getById);
router.patch("/:id", editWord);
router.post("/", addWord);
router.delete("/:id", deleteWord);

export default router;
