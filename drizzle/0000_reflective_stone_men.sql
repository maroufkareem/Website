CREATE TABLE "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_url" text DEFAULT '' NOT NULL,
	"label" text DEFAULT '' NOT NULL,
	"title" text NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"program_interest" text,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nav_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"href" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"path" text NOT NULL,
	"referrer" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programs" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text DEFAULT '' NOT NULL,
	"title" text NOT NULL,
	"price" text DEFAULT '' NOT NULL,
	"meta" text DEFAULT '' NOT NULL,
	"date" text DEFAULT '' NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_eyebrow" text DEFAULT '' NOT NULL,
	"hero_doctor_name" text DEFAULT '' NOT NULL,
	"hero_doctor_role" text DEFAULT '' NOT NULL,
	"hero_headline" text DEFAULT '' NOT NULL,
	"hero_copy" text DEFAULT '' NOT NULL,
	"hero_quote" text DEFAULT '' NOT NULL,
	"hero_badges" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"hero_image_url" text DEFAULT '/marouf-assets/hero.jpg' NOT NULL,
	"stats" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"about_eyebrow" text DEFAULT '' NOT NULL,
	"about_heading" text DEFAULT '' NOT NULL,
	"about_paragraph_1" text DEFAULT '' NOT NULL,
	"about_paragraph_2" text DEFAULT '' NOT NULL,
	"about_credentials" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"about_portrait_url" text DEFAULT '/marouf-assets/doctor-portrait.jpeg' NOT NULL,
	"method_steps" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"featured_eyebrow" text DEFAULT '' NOT NULL,
	"featured_heading" text DEFAULT '' NOT NULL,
	"featured_body" text DEFAULT '' NOT NULL,
	"featured_checklist" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"featured_image_1_url" text DEFAULT '/marouf-assets/clinic-1.jpg' NOT NULL,
	"featured_image_2_url" text DEFAULT '/marouf-assets/clinic-2.jpg' NOT NULL,
	"contact_email" text DEFAULT '' NOT NULL,
	"contact_phone" text DEFAULT '' NOT NULL,
	"contact_whatsapp" text DEFAULT '' NOT NULL,
	"social_links" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"footer_blurb" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"author" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL
);
