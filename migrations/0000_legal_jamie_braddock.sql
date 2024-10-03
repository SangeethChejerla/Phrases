CREATE TABLE IF NOT EXISTS "phrases" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"user_id" text NOT NULL,
	"phrase" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
