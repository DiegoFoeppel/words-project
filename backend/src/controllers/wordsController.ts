import { db, mySchema } from "../db";

import { Request, Response } from "express";
import { learning } from "../db/schema";
import { and, eq, like } from "drizzle-orm";

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await db.select().from(learning);

    return res.status(200).json({ words: response });
  } catch (err) {
    console.log("Error on getting all sentences", err);
    return res.status(500).json({ error: "Error on getting all words" });
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

    // const { english, translation, ...rest } = sentence;

    // console.log("neg", english, translation, rest);

    // const result = {
    //   ...rest,
    //   english: english ?? undefined,
    //   translation: translation ?? undefined,
    // };

    // console.log("neg2", result);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const getByFilter = async (req: Request, res: Response) => {
  try {
    const { word, sentence } = req.query;

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

    const result = await db.execute(query);

    console.log(result);

    return res.status(200).json({ words: result.rows });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const addWord = async (req: Request, res: Response) => {
  try {
    const { word, sentence, source, status, english, translation } = req.body;

    if (!word) {
      return res.status(400).json({ message: "Word is needed" });
    }

    const response = await db.insert(learning).values({
      word: word,
      sentence: sentence ?? null,
      source: source ?? null,
      status,
      translation,
      english,
    });

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const editWord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { word, sentence } = req.body;

    console.log("teste1", req.body, req.query);

    const data = req.body;

    const [item] = await db
      .select()
      .from(learning)
      .where(eq(learning.id, Number(id)));

    console.log("teste2", item);

    if (!item) {
      return res
        .status(404)
        .json({ message: "Couldnt find the item. Provide a valid ID" });
    }

    console.log("teste", Number(id));

    const response = await db
      .update(learning)
      .set(data)
      .where(eq(learning.id, Number(id)))
      .returning({ updatedId: learning.id });

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const deleteWord = async (req: Request, res: Response) => {
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
    console.log("Error on getting all sentences", err);
    return res.status(500).json({ error: "Error on getting all words" });
  }
};
