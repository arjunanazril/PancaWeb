import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.STORAGE_DATABASE_URL ||
    process.env.STORAGE_POSTGRES_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL
  );
}

export async function POST(request: Request) {
  const token = request.headers.get("x-migration-token");
  const expectedToken = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

  if (!expectedToken || token !== expectedToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    return Response.json({ error: "Database URL is not available" }, { status: 500 });
  }

  await neon(databaseUrl).query(`CREATE TABLE IF NOT EXISTS "site_settings" (
    "id" text PRIMARY KEY NOT NULL,
    "hero_image_one" text NOT NULL,
    "hero_image_two" text NOT NULL,
    "hero_image_three" text NOT NULL,
    "collection_label" text NOT NULL,
    "collection_value" text NOT NULL,
    "feature_number" text NOT NULL,
    "feature_text" text NOT NULL,
    "curation_title" text NOT NULL,
    "curation_description" text NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  )`, []);

  return Response.json({ ok: true, migrated: "site_settings" });
}
