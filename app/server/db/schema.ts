import { sqliteTable, text, integer, int } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm';
//replace / with %2F

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  username: text("username").unique().notNull(),
  hashedPassword: text("hashed_password"),
})

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: int("expires_at", { mode: "timestamp" }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const oauth_account = sqliteTable("oauth_account", {
  providerId: text("provider_id").notNull(),
  providerUserId: text("provider_user_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})
