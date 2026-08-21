import { db } from "../db";

import { Request, Response } from "express";
import { learning } from "../db/schema";
import { and, eq, like } from "drizzle-orm";

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await db.select().from(learning);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [sentence] = await db
      .select()
      .from(learning)
      .where(eq(learning.id, Number(id)));

    if (!sentence) {
      return res
        .status(404)
        .json({ message: "Couldnt find the sentence. Provide a valid ID" });
    }

    return res.status(200).json(sentence);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const getByFilter = async (req: Request, res: Response) => {
  try {
    const { word, sentence } = req.params;

    const wordFilter = `%${word}%`;

    const [result] = await db
      .select()
      .from(learning)
      .where(like(learning.word, wordFilter));

    if (!word) {
      return res
        .status(404)
        .json({ message: "Couldnt find the sentence. Provide a valid ID" });
    }

    return res.status(200).json(res);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const createSentence = async (req: Request, res: Response) => {
  try {
    const { word, sentence } = req.body;

    if (!word) {
      return res.status(400).json({ message: "Word is needed" });
    }

    const response = await db
      .insert(learning)
      .values({ word: word, sentence: sentence ?? null });

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const editSentence = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const { word, sentence } = req.body;

    const [item] = await db
      .select()
      .from(learning)
      .where(eq(learning.id, Number(id)));

    if (!item) {
      return res
        .status(404)
        .json({ message: "Couldnt find the sentence. Provide a valid ID" });
    }

    const response = await db
      .update(learning)
      .set({ word: word, sentence: sentence })
      .where(eq(learning.id, Number(id)));

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const deleteSentence = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [sentence] = await db
      .select()
      .from(learning)
      .where(eq(learning.id, Number(id)));

    if (!sentence) {
      return res
        .status(404)
        .json({ message: "Couldnt find the sentence. Provide a valid ID" });
    }

    await db.delete(learning).where(eq(learning.id, Number(id)));

    return res.status(200).json({ message: "Sentence deleted" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
