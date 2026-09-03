import {
  integer,
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { mySchema } from ".";

export const statusEnum = pgEnum("learning_status", [
  "new",
  "learning",
  "mastered",
]);

export const learning = mySchema.table("learning", {
  id: serial("id").primaryKey(),
  word: varchar("word", { length: 50 }).notNull(),
  status: statusEnum("status").default("new").notNull(),
  sentence: text("sentence"),
  english: text("english"),
  translation: text("translation"),
  source: varchar("source"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const frequentWords = mySchema.table("words", {
  id: serial("id").primaryKey(),
  german: text("german"),
  english: text("english"),
});

export const sentences = mySchema.table("sentences", {
  id: serial("id").primaryKey(),
  sentence: text("sentence"),
});
