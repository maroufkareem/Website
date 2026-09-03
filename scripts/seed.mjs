// One-time seed script: inserts the site's original hardcoded content (as it
// existed in app/page.tsx before the CMS migration) into the database, and
// creates the first admin user from ADMIN_EMAIL / ADMIN_PASSWORD.
//
// Usage:
//   DATABASE_URL=postgres://... ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=change-me node scripts/seed.mjs
//
// Safe to re-run: site_settings is only inserted if empty, admin user is
// only created if the email doesn't already exist, and all other tables are
// only seeded if they are currently empty (so it never duplicates content
// the admin has already started editing).

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import bcrypt from "bcryptjs";

// Table refs are defined locally (rather than imported from db/schema.ts)
// because this script runs as plain Node ESM (`node scripts/seed.mjs`) and
// TypeScript source files aren't importable without a build step. Column
// names below must stay in sync with db/schema.ts.
const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  heroEyebrow: text("hero_eyebrow").notNull().default(""),
  heroDoctorName: text("hero_doctor_name").notNull().default(""),
  heroDoctorRole: text("hero_doctor_role").notNull().default(""),
  heroHeadline: text("hero_headline").notNull().default(""),
  heroCopy: text("hero_copy").notNull().default(""),
  heroQuote: text("hero_quote").notNull().default(""),
  heroBadges: jsonb("hero_badges").notNull().default([]),
  heroImageUrl: text("hero_image_url").notNull().default("/marouf-assets/hero.jpg"),
  stats: jsonb("stats").notNull().default([]),
  aboutEyebrow: text("about_eyebrow").notNull().default(""),
  aboutHeading: text("about_heading").notNull().default(""),
  aboutParagraph1: text("about_paragraph_1").notNull().default(""),
  aboutParagraph2: text("about_paragraph_2").notNull().default(""),
  aboutCredentials: jsonb("about_credentials").notNull().default([]),
  aboutPortraitUrl: text("about_portrait_url").notNull().default("/marouf-assets/doctor-portrait.jpeg"),
  methodSteps: jsonb("method_steps").notNull().default([]),
  featuredEyebrow: text("featured_eyebrow").notNull().default(""),
  featuredHeading: text("featured_heading").notNull().default(""),
  featuredBody: text("featured_body").notNull().default(""),
  featuredChecklist: jsonb("featured_checklist").notNull().default([]),
  featuredImage1Url: text("featured_image_1_url").notNull().default("/marouf-assets/book-capsule-cover.jpg"),
  featuredImage2Url: text("featured_image_2_url").notNull().default("/marouf-assets/book-capsule-cover.jpg"),
  contactEmail: text("contact_email").notNull().default(""),
  contactPhone: text("contact_phone").notNull().default(""),
  contactWhatsapp: text("contact_whatsapp").notNull().default(""),
  socialLinks: jsonb("social_links").notNull().default({}),
  footerBlurb: text("footer_blurb").notNull().default(""),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const programs = pgTable("programs", {
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

const books = pgTable("books", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull().default(""),
  label: text("label").notNull().default(""),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  body: text("body").notNull(),
  author: text("author").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

const navItems = pgTable("nav_items", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required to run the seed script.");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

// Hrefs point at in-page anchors, matching the section ids the site actually
// renders (this is a single-page site — there are no separate sub-pages).
const NAV_ITEMS = [
  { label: "Home", href: "/", sortOrder: 0 },
  { label: "About", href: "/about", sortOrder: 1 },
  { label: "Courses", href: "/courses", sortOrder: 2 },
  { label: "Books", href: "/books", sortOrder: 3 },
  { label: "Achievements", href: "/achievements", sortOrder: 4 },
  { label: "Testimonials", href: "/testimonials", sortOrder: 5 },
  { label: "Contact", href: "/contact", sortOrder: 6 },
  { label: "Quizzes", href: "/quizzes", sortOrder: 7 },
];

const STATS = [
  { number: "5+", label: "YEARS OF TEACHING", sub: "EXPERIENCE" },
  { number: "3", label: "PUBLISHED BIOLOGY", sub: "BOOKS" },
  { number: "10-12", label: "ACADEMIC PROGRAM", sub: "GRADES" },
  { number: "Bio & Psych", label: "SPECIALIZED SUBJECTS", sub: "" },
];

const PROGRAMS = [
  {
    label: "BIOLOGY",
    title: "Cambridge Biology O Level",
    price: "",
    meta: "GRADES 10, 11 & 12    ONLINE - 8-MONTH PROGRAM",
    date: "1 OCTOBER - 1 MAY",
    body: "A complete Cambridge Biology program designed to simplify difficult concepts, strengthen scientific understanding, and improve exam-answering skills.",
    sortOrder: 0,
    published: true,
  },
  {
    label: "PSYCHOLOGY",
    title: "Cambridge Psychology O Level",
    price: "$400",
    meta: "GRADES 10, 11 & 12    ONLINE - 8-MONTH PROGRAM",
    date: "1 OCTOBER - 1 MAY",
    body: "A complete Psychology program designed to simplify key theories, strengthen analytical thinking, and improve structured exam-answering skills.",
    sortOrder: 1,
    published: true,
  },
];

const METHOD_STEPS = [
  { number: "01", title: "Understand", body: "Complex topics are broken down into clear, logical explanations that make sense on first encounter." },
  { number: "02", title: "Connect", body: "Scientific concepts are connected to real examples and visual learning for deeper retention." },
  { number: "03", title: "Practice", body: "Students apply what they learn through structured questions and guided revision sessions." },
  { number: "04", title: "Master", body: "Students build confidence, accuracy, and strong exam technique for lasting academic success." },
];

const BOOKS = [
  { imageUrl: "/marouf-assets/book-9.jpg", label: "Grade 9 - Cambridge", title: "Biology Core - Grade 9", body: "A clear, structured guide that simplifies core Biology concepts and supports confident learning throughout the year.", sortOrder: 0, published: true },
  { imageUrl: "/marouf-assets/book-10.jpg", label: "Grade 10 - O Level", title: "Biology O Level - Grade 10", body: "A complete Biology guide with clear explanations, diagrams, revision support, and exam-focused practice.", sortOrder: 1, published: true },
  { imageUrl: "/marouf-assets/book-capsule-cover.jpg", label: "IGCSE BIOLOGY - REVISION GUIDE", title: "Marouf's Bio Capsule", body: "A focused revision guide that simplifies key Biology topics and strengthens exam preparation.", sortOrder: 2, published: true },
  { imageUrl: "/marouf-assets/book-psych.jpg", label: "IGCSE - PSYCHOLOGY O LEVEL", title: "Psychology O Level", body: "A structured Psychology guide covering key concepts, clear explanations, and exam-focused learning.", sortOrder: 3, published: true },
];

const ACHIEVEMENTS = [
  { title: "Human Biology Excellence", body: "Completed Human Biology with an excellent grade in the Faculty of Oral and Dental Medicine.", sortOrder: 0, published: true },
  { title: "Bachelor of Dental Surgery", body: "Strong medical and scientific academic background from Future University in Egypt.", sortOrder: 1, published: true },
  { title: "IGCSE Graduate", body: "Successfully completed the IGCSE requirements at Sahara International School.", sortOrder: 2, published: true },
  { title: "Published Educational Resources", body: "Author of Biology Core Grade 9, Biology O Level Year 10, Marouf's Bio Capsule, and Psychology O Level Year 10 educational resources.", sortOrder: 3, published: true },
];

const TESTIMONIALS = [
  { body: "Biology used to be the subject I disliked most because I could not understand it. Now I genuinely look forward to every Biology session.", author: "BIOLOGY STUDENT", sortOrder: 0, published: true },
  { body: "Everything Dr. Kareem told us to focus on appeared in the exam, and the exam felt much easier than expected.", author: "O LEVEL BIOLOGY STUDENT", sortOrder: 1, published: true },
  { body: "Thank you for making Biology clearer, easier, and more enjoyable throughout the year. Your support made a real difference.", author: "GRADE 10 STUDENT", sortOrder: 2, published: true },
];

const SITE_SETTINGS = {
  heroEyebrow: "CAMBRIDGE BIOLOGY & PSYCHOLOGY EDUCATION",
  heroDoctorName: "DR. KAREEM WAEL MAAROUF",
  heroDoctorRole: "Dentist by Profession.",
  heroHeadline: "Where Knowledge Becomes Mastery",
  heroCopy:
    "Learn Biology and Psychology through clear explanations, premium academic resources, and exam-focused guidance by Dr. Kareem Wael Maarouf.",
  heroQuote: '"Understand More. Memorize Less."',
  heroBadges: ["GRADES 10-12", "ONLINE PROGRAMS", "CAMBRIDGE & O LEVEL"],
  heroImageUrl: "/marouf-assets/hero.jpg",
  stats: STATS,

  aboutEyebrow: "ABOUT DR. KAREEM",
  aboutHeading: "Dentist by Profession. Educator by Passion.",
  aboutParagraph1:
    "Dr. Kareem Wael Maarouf combines a strong medical and scientific background with years of teaching experience to make Biology and Psychology clear, engaging, and memorable.",
  aboutParagraph2:
    "He focuses on understanding rather than memorization, helping students develop confidence, scientific thinking, and stronger exam performance.",
  aboutCredentials: ["BACHELOR OF DENTAL SURGERY", "EXCELLENCE IN HUMAN BIOLOGY", "BIOLOGY & PSYCHOLOGY EDUCATOR"],
  aboutPortraitUrl: "/marouf-assets/doctor-portrait.jpeg",

  methodSteps: METHOD_STEPS,

  featuredEyebrow: "FEATURED BIOLOGY GUIDE",
  featuredHeading: "A Complete Biology Companion",
  featuredBody:
    "A comprehensive Year 10 Biology guide designed with clear explanations, visual summaries, comparison tables, diagrams, and organized syllabus coverage for maximum exam readiness.",
  featuredChecklist: ["28 organized chapters", "Visual summaries", "Comparison tables", "Clear definitions", "Exam-focused support"],
  featuredImage1Url: "/marouf-assets/book-capsule-cover.jpg",
  featuredImage2Url: "/marouf-assets/book-capsule-cover.jpg",

  contactEmail: "maroufkareem0@gmail.com",
  contactPhone: "01114626999",
  contactWhatsapp: "https://wa.me/201114626999",
  socialLinks: { instagram: "#", linkedin: "#", tiktok: "#", whatsapp: "https://wa.me/201114626999" },

  footerBlurb:
    "Premium Biology and Psychology education focused on clear understanding, academic confidence, and exam success.",
};

async function seedTable(table, rows, name) {
  const existing = await db.select().from(table).limit(1);
  if (existing.length > 0) {
    console.log(`- ${name}: already has data, skipping.`);
    return;
  }
  await db.insert(table).values(rows);
  console.log(`- ${name}: inserted ${rows.length} row(s).`);
}

async function seedSiteSettings() {
  const existing = await db.select().from(siteSettings).limit(1);
  if (existing.length > 0) {
    console.log("- site_settings: already has data, skipping.");
    return;
  }
  await db.insert(siteSettings).values(SITE_SETTINGS);
  console.log("- site_settings: inserted singleton row.");
}

async function seedAdminUser() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log("- admin_users: ADMIN_EMAIL/ADMIN_PASSWORD not set, skipping admin creation.");
    return;
  }
  const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, ADMIN_EMAIL));
  if (existing.length > 0) {
    console.log(`- admin_users: ${ADMIN_EMAIL} already exists, skipping.`);
    return;
  }
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await db.insert(adminUsers).values({ email: ADMIN_EMAIL, passwordHash });
  console.log(`- admin_users: created admin ${ADMIN_EMAIL}.`);
}

async function main() {
  console.log("Seeding database...");
  await seedSiteSettings();
  await seedTable(navItems, NAV_ITEMS, "nav_items");
  await seedTable(programs, PROGRAMS, "programs");
  await seedTable(books, BOOKS, "books");
  await seedTable(achievements, ACHIEVEMENTS, "achievements");
  await seedTable(testimonials, TESTIMONIALS, "testimonials");
  await seedAdminUser();
  console.log("Done.");
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
