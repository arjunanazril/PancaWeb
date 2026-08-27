import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);
export const feedbackCategoryEnum = pgEnum("feedback_category", ["CONTENT", "DESIGN", "BUG", "SUGGESTION", "OTHER"]);

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: userRoleEnum("role").notNull().default("USER"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  }),
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (token) => ({
    compoundKey: primaryKey({ columns: [token.identifier, token.token] }),
  }),
);

export const galleryPosts = pgTable("gallery_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  location: text("location"),
  documentedAt: timestamp("documented_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  createdBy: text("created_by").notNull().references(() => users.id),
});

export const galleryPostSila = pgTable(
  "gallery_post_sila",
  {
    postId: text("post_id").notNull().references(() => galleryPosts.id, { onDelete: "cascade" }),
    silaNumber: integer("sila_number").notNull(),
  },
  (item) => ({
    compoundKey: primaryKey({ columns: [item.postId, item.silaNumber] }),
  }),
);

export const feedback = pgTable("feedback", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  category: feedbackCategoryEnum("category").notNull(),
  rating: integer("rating").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  galleryPosts: many(galleryPosts),
  feedback: many(feedback),
}));

export const galleryPostsRelations = relations(galleryPosts, ({ one, many }) => ({
  author: one(users, { fields: [galleryPosts.createdBy], references: [users.id] }),
  sila: many(galleryPostSila),
}));

export const galleryPostSilaRelations = relations(galleryPostSila, ({ one }) => ({
  post: one(galleryPosts, { fields: [galleryPostSila.postId], references: [galleryPosts.id] }),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, { fields: [feedback.userId], references: [users.id] }),
}));
