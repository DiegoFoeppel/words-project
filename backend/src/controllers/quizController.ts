import { db } from "../db";

import { Request, Response } from "express";
import { frequentWords } from "../db/schema";
import { and, eq, like, sql } from "drizzle-orm";

export const getAll = async (req: Request, res: Response) => {
  const { word, sentence } = req.query;
  const { id } = req.params;

  try {
    const response = await db.select().from(frequentWords);

    console.log("quer", req.query);

    let query: string = `select * from german_words.learning `;
    // let params = [];

    if (word) {
      query += `where word like '%${word}%'`;
      //   params.push(word);
    }

    if (sentence) {
      query += `where sentence like '%${sentence}%'`;
      //   params.push(sentence);
    }

    return res.status(200).json(response);
  } catch (err) {
    console.log("Error on getting all words", err);
    return res.status(500).json({ error: "Error on getting all words" });
  }
};

export const getWordById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "no id provided" });
  }

  try {
    const [response] = await db
      .select()
      .from(frequentWords)
      .where(eq(frequentWords.id, id));

    if (!response) {
      return res.status(404).json({ message: "no word for provided id" });
    }

    return res.status(200).json(response);
  } catch (err) {
    console.log("Error on getting word", err);
    return res.status(500).json({ error: "Error on getting all words" });
  }
};

export const getRandomWord = async (req: Request, res: Response) => {
  try {
    const [word] = await db
      .select()
      .from(frequentWords)
      .orderBy(sql`RANDOM()`) // Uses Postgres RANDOM() function
      .limit(1);

    console.log("word", word);

    return res.status(200).json(word);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const updateExample = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sentence, translation } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id not provided" });
  }

  if (!sentence || !translation) {
    return res.status(400).json({ message: "not data provided" });
  }

  try {
    const [word] = await db
      .select()
      .from(frequentWords)
      .where(eq(frequentWords.id, id));

    if (!word) {
      return res.status(404).json({ message: "word not found" });
    }

    const updatedWord = await db
      .update(frequentWords)
      .set({ sentence, translation })
      .where(eq(frequentWords.id, id))
      .returning({ id: frequentWords.id });

    return res.status(200).json({ updatedWord });
  } catch (err) {
    console.log("Error updating word: ", err);
    return res.status(500).json({ error: "Error on updating word" });
  }
};

export const deleteExample = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id not provided" });
  }

  try {
    const [word] = await db
      .select()
      .from(frequentWords)
      .where(eq(frequentWords.id, id));

    if (!word) {
      return res.status(404).json({ message: "word not found" });
    }

    const deletedWord = await db
      .delete(frequentWords)
      .where(eq(frequentWords.id, id))
      .returning({ id: frequentWords.id });

    return res.status(200).json({ deletedWord });
  } catch (err) {
    console.log("Error deleting word: ", err);
    return res.status(500).json({ error: "Error on deleting word" });
  }
};
