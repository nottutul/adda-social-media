import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  cover: text("cover"), 
  bio: text("bio"),
  location: text("location"),
  work: text("work"),
  school: text("school"),
});

export const postsTable = pgTable("posts", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  desc: text("desc"),
  img: text("img"),
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
