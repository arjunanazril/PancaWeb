import { neon } from "@neondatabase/serverless";
import { getDatabaseUrl } from "@/lib/db";

export const dynamic = "force-dynamic";

const statements = [
  `DO $$ BEGIN
    CREATE TYPE "public"."feedback_category" AS ENUM('CONTENT', 'DESIGN', 'BUG', 'SUGGESTION', 'OTHER');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN
    CREATE TYPE "public"."user_role" AS ENUM('USER', 'ADMIN');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `CREATE TABLE IF NOT EXISTS "users" (
    "id" text PRIMARY KEY NOT NULL,
    "name" text,
    "email" text NOT NULL,
    "email_verified" timestamp,
    "image" text,
    "role" "user_role" DEFAULT 'USER' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "users_email_unique" UNIQUE("email")
  )`,
  `CREATE TABLE IF NOT EXISTS "accounts" (
    "user_id" text NOT NULL,
    "type" text NOT NULL,
    "provider" text NOT NULL,
    "provider_account_id" text NOT NULL,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text,
    CONSTRAINT "accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
  )`,
  `CREATE TABLE IF NOT EXISTS "sessions" (
    "session_token" text PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,
    "expires" timestamp NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS "verification_tokens" (
    "identifier" text NOT NULL,
    "token" text NOT NULL,
    "expires" timestamp NOT NULL,
    CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
  )`,
  `CREATE TABLE IF NOT EXISTS "gallery_posts" (
    "id" text PRIMARY KEY NOT NULL,
    "slug" text NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "image_url" text NOT NULL,
    "location" text,
    "documented_at" timestamp,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "created_by" text NOT NULL,
    CONSTRAINT "gallery_posts_slug_unique" UNIQUE("slug")
  )`,
  `CREATE TABLE IF NOT EXISTS "gallery_post_sila" (
    "post_id" text NOT NULL,
    "sila_number" integer NOT NULL,
    CONSTRAINT "gallery_post_sila_post_id_sila_number_pk" PRIMARY KEY("post_id","sila_number")
  )`,
  `CREATE TABLE IF NOT EXISTS "feedback" (
    "id" text PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,
    "category" "feedback_category" NOT NULL,
    "rating" integer NOT NULL,
    "message" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
  )`,
  `DO $$ BEGIN
    ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN
    ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN
    ALTER TABLE "feedback" ADD CONSTRAINT "feedback_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN
    ALTER TABLE "gallery_posts" ADD CONSTRAINT "gallery_posts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN
    ALTER TABLE "gallery_post_sila" ADD CONSTRAINT "gallery_post_sila_post_id_gallery_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."gallery_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
];

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

  const sql = neon(databaseUrl);
  for (const statement of statements) {
    await sql.query(statement, []);
  }

  return Response.json({ ok: true, migrated: statements.length });
}
