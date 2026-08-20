import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type SiteStat = { number: string; label: string; sub: string };
export type MethodStep = { number: string; title: string; body: string };
export type SocialLinks = {
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  whatsapp?: string;
};

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  // Hero
  heroEyebrow: text("hero_eyebrow").notNull().default(""),
  heroDoctorName: text("hero_doctor_name").notNull().default(""),
  heroDoctorRole: text("hero_doctor_role").notNull().default(""),
  heroHeadline: text("hero_headline").notNull().default(""),
  heroCopy: text("hero_copy").notNull().default(""),
  heroQuote: text("hero_quote").notNull().default(""),
  heroBadges: jsonb("hero_badges").$type<string[]>().notNull().default([]),
  heroImageUrl: text("hero_image_url").notNull().default("/marouf-assets/hero.jpg"),
  stats: jsonb("stats").$type<SiteStat[]>().notNull().default([]),

  // About
  aboutEyebrow: text("about_eyebrow").notNull().default(""),
  aboutHeading: text("about_heading").notNull().default(""),
  aboutParagraph1: text("about_paragraph_1").notNull().default(""),
  aboutParagraph2: text("about_paragraph_2").notNull().default(""),
  aboutCredentials: jsonb("about_credentials").$type<string[]>().notNull().default([]),
  aboutPortraitUrl: text("about_portrait_url").notNull().default("/marouf-assets/doctor-portrait.jpeg"),

  // Method
  methodSteps: jsonb("method_steps").$type<MethodStep[]>().notNull().default([]),

  // Featured guide
  featuredEyebrow: text("featured_eyebrow").notNull().default(""),
  featuredHeading: text("featured_heading").notNull().default(""),
  featuredBody: text("featured_body").notNull().default(""),
  featuredChecklist: jsonb("featured_checklist").$type<string[]>().notNull().default([]),
  featuredImage1Url: text("featured_image_1_url").notNull().default("/marouf-assets/clinic-1.jpg"),
  featuredImage2Url: text("featured_image_2_url").notNull().default("/marouf-assets/clinic-2.jpg"),

  // Contact & social
  contactEmail: text("contact_email").notNull().default(""),
  contactPhone: text("contact_phone").notNull().default(""),
  contactWhatsapp: text("contact_whatsapp").notNull().default(""),
  socialLinks: jsonb("social_links").$type<SocialLinks>().notNull().default({}),

  // Footer
  footerBlurb: text("footer_blurb").notNull().default(""),

  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  label: text("label").notNull().default(""),
  title: text("title").notNull(),
  price: text("price").notNull().default(""),
  meta: text("meta").notNull().default(""),
  date: text("date").notNull().default(""),
  body: text("body").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull().default(""),
  label: text("label").notNull().default(""),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  body: text("body").notNull(),
  author: text("author").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

export const navItems = pgTable("nav_items", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  message: text("message").notNull().default(""),
  programInterest: text("program_interest"),
  status: text("status").notNull().default("new"), // 'new' | 'contacted' | 'closed'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  referrer: text("referrer").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
