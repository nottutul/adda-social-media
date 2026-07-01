import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar().primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  avatar: varchar({ length: 255 }),
  cover: varchar({ length: 255 }),
  bio: varchar({ length: 255 }),
  location: varchar({ length: 255 }),
  work: varchar({ length: 255 }),
  school: varchar({ length: 255 }),
});

export const postsTable = pgTable("posts", {
  id: varchar().primaryKey(),
  userId: varchar().notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  desc: varchar({ length: 255 }).notNull(),
  img: varchar({ length: 255 }),
  likes: integer().notNull().default(0),
  comments: integer().notNull().default(0),
  shares: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.id],
  }),
}));
