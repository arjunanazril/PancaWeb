import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.STORAGE_DATABASE_URL ||
  process.env.STORAGE_POSTGRES_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL;

export const db = databaseUrl
  ? drizzle(neon(databaseUrl), { schema })
  : null;

export function assertDb() {
  if (!db) {
    throw new Error("Database connection is not available.");
  }
  return db;
}
