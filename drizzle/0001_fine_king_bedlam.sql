CREATE TABLE "site_settings" (
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
);
