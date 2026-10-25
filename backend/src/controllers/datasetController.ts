import { db } from "../db";

import { Request, Response } from "express";
import { sentences } from "../db/schema";
import { and, eq, like } from "drizzle-orm";

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await db.select().from(sentences).limit(10);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const getExamples = async (req: Request, res: Response) => {
  try {
    const { word } = req.query;

    console.log("word", word);

    const match = `% ${String(word).toLowerCase()} %`;

    const response = await db
      .select()
      .from(sentences)
      .where(like(sentences.sentence, match))
      .limit(20);

    return res.status(200).json(response);
  } catch (err) {
    console.log("Error deleting word: ", err);
    return res.status(500).json({ error: "Error on deleting word" });
  }
};
