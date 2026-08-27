CREATE TABLE "book_reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer,
	"book_title" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"note" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
