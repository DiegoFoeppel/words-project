import { db } from "../db";

import { Request, Response } from "express";
import { frequentWords } from "../db/schema";
import { and, eq, like, sql } from "drizzle-orm";

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await db.select().from(frequentWords);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const getRandomWord = async (req: Request, res: Response) => {
  try {
    const [data] = await db
      .select()
      .from(frequentWords)
      .orderBy(sql`RANDOM()`) // Uses Postgres RANDOM() function
      .limit(1);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
