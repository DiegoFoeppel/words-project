import {
  integer,
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const learning = pgTable("learning", {
  id: serial("id").primaryKey(),
  word: varchar("word", { length: 50 }).notNull(),
  sentence: text("sentence"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
