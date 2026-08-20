import { desc, eq, gte, sql } from "drizzle-orm";
import { getDb } from "./index";
import {
  achievements,
  adminUsers,
  books,
  enquiries,
  navItems,
  pageViews,
  programs,
  siteSettings,
  testimonials,
  type SiteStat,
  type MethodStep,
  type SocialLinks,
} from "./schema";

// ---------- site settings (singleton) ----------

export type SiteSettings = typeof siteSettings.$inferSelect;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const db = getDb();
  const rows = await db.select().from(siteSettings).limit(1);
  return rows[0] ?? null;
}

export async function updateSiteSettings(
  patch: Partial<Omit<SiteSettings, "id" | "updatedAt">>
): Promise<void> {
  const db = getDb();
  const existing = await getSiteSettings();
  if (!existing) {
    await db.insert(siteSettings).values({ ...patch, updatedAt: new Date() });
    return;
  }
  await db
    .update(siteSettings)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(siteSettings.id, existing.id));
}

// ---------- programs ----------

export type Program = typeof programs.$inferSelect;

export async function getPrograms(onlyPublished = true): Promise<Program[]> {
  const db = getDb();
  const rows = await db
    .select()
    .from(programs)
    .where(onlyPublished ? eq(programs.published, true) : undefined)
    .orderBy(programs.sortOrder);
  return rows;
}

export async function getAllPrograms(): Promise<Program[]> {
  return getPrograms(false);
}

export async function getProgramById(id: number): Promise<Program | null> {
  const db = getDb();
  const rows = await db.select().from(programs).where(eq(programs.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createProgram(values: Omit<Program, "id">): Promise<Program> {
  const db = getDb();
  const [row] = await db.insert(programs).values(values).returning();
  return row;
}

export async function updateProgram(id: number, values: Partial<Omit<Program, "id">>): Promise<void> {
  const db = getDb();
  await db.update(programs).set(values).where(eq(programs.id, id));
}

export async function deleteProgram(id: number): Promise<void> {
  const db = getDb();
  await db.delete(programs).where(eq(programs.id, id));
}

// ---------- books ----------

export type Book = typeof books.$inferSelect;

export async function getBooks(onlyPublished = true): Promise<Book[]> {
  const db = getDb();
  return db
    .select()
    .from(books)
    .where(onlyPublished ? eq(books.published, true) : undefined)
    .orderBy(books.sortOrder);
}

export async function getAllBooks(): Promise<Book[]> {
  return getBooks(false);
}

export async function getBookById(id: number): Promise<Book | null> {
  const db = getDb();
  const rows = await db.select().from(books).where(eq(books.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createBook(values: Omit<Book, "id">): Promise<Book> {
  const db = getDb();
  const [row] = await db.insert(books).values(values).returning();
  return row;
}

export async function updateBook(id: number, values: Partial<Omit<Book, "id">>): Promise<void> {
  const db = getDb();
  await db.update(books).set(values).where(eq(books.id, id));
}

export async function deleteBook(id: number): Promise<void> {
  const db = getDb();
  await db.delete(books).where(eq(books.id, id));
}

// ---------- achievements ----------

export type Achievement = typeof achievements.$inferSelect;

export async function getAchievements(onlyPublished = true): Promise<Achievement[]> {
  const db = getDb();
  return db
    .select()
    .from(achievements)
    .where(onlyPublished ? eq(achievements.published, true) : undefined)
    .orderBy(achievements.sortOrder);
}

export async function getAllAchievements(): Promise<Achievement[]> {
  return getAchievements(false);
}

export async function getAchievementById(id: number): Promise<Achievement | null> {
  const db = getDb();
  const rows = await db.select().from(achievements).where(eq(achievements.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createAchievement(values: Omit<Achievement, "id">): Promise<Achievement> {
  const db = getDb();
  const [row] = await db.insert(achievements).values(values).returning();
  return row;
}

export async function updateAchievement(id: number, values: Partial<Omit<Achievement, "id">>): Promise<void> {
  const db = getDb();
  await db.update(achievements).set(values).where(eq(achievements.id, id));
}

export async function deleteAchievement(id: number): Promise<void> {
  const db = getDb();
  await db.delete(achievements).where(eq(achievements.id, id));
}

// ---------- testimonials ----------

export type Testimonial = typeof testimonials.$inferSelect;

export async function getTestimonials(onlyPublished = true): Promise<Testimonial[]> {
  const db = getDb();
  return db
    .select()
    .from(testimonials)
    .where(onlyPublished ? eq(testimonials.published, true) : undefined)
    .orderBy(testimonials.sortOrder);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return getTestimonials(false);
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  const db = getDb();
  const rows = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createTestimonial(values: Omit<Testimonial, "id">): Promise<Testimonial> {
  const db = getDb();
  const [row] = await db.insert(testimonials).values(values).returning();
  return row;
}

export async function updateTestimonial(id: number, values: Partial<Omit<Testimonial, "id">>): Promise<void> {
  const db = getDb();
  await db.update(testimonials).set(values).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number): Promise<void> {
  const db = getDb();
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ---------- nav items ----------

export type NavItem = typeof navItems.$inferSelect;

export async function getNavItems(): Promise<NavItem[]> {
  const db = getDb();
  return db.select().from(navItems).orderBy(navItems.sortOrder);
}

export async function getNavItemById(id: number): Promise<NavItem | null> {
  const db = getDb();
  const rows = await db.select().from(navItems).where(eq(navItems.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createNavItem(values: Omit<NavItem, "id">): Promise<NavItem> {
  const db = getDb();
  const [row] = await db.insert(navItems).values(values).returning();
  return row;
}

export async function updateNavItem(id: number, values: Partial<Omit<NavItem, "id">>): Promise<void> {
  const db = getDb();
  await db.update(navItems).set(values).where(eq(navItems.id, id));
}

export async function deleteNavItem(id: number): Promise<void> {
  const db = getDb();
  await db.delete(navItems).where(eq(navItems.id, id));
}

// ---------- enquiries ----------

export type Enquiry = typeof enquiries.$inferSelect;

export async function createEnquiry(values: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  programInterest?: string | null;
}): Promise<Enquiry> {
  const db = getDb();
  const [row] = await db
    .insert(enquiries)
    .values({
      name: values.name,
      email: values.email,
      phone: values.phone ?? "",
      message: values.message ?? "",
      programInterest: values.programInterest ?? null,
      status: "new",
    })
    .returning();
  return row;
}

export async function listEnquiries(): Promise<Enquiry[]> {
  const db = getDb();
  return db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
}

export async function getRecentEnquiries(limit = 5): Promise<Enquiry[]> {
  const db = getDb();
  return db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(limit);
}

export async function updateEnquiryStatus(id: number, status: "new" | "contacted" | "closed"): Promise<void> {
  const db = getDb();
  await db.update(enquiries).set({ status }).where(eq(enquiries.id, id));
}

export async function deleteEnquiry(id: number): Promise<void> {
  const db = getDb();
  await db.delete(enquiries).where(eq(enquiries.id, id));
}

export async function countNewEnquiries(): Promise<number> {
  const db = getDb();
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(enquiries)
    .where(eq(enquiries.status, "new"));
  return rows[0]?.count ?? 0;
}

// ---------- page views / analytics ----------

export async function recordPageView(path: string, referrer: string): Promise<void> {
  const db = getDb();
  await db.insert(pageViews).values({ path, referrer });
}

export async function getPageViewStats(days = 30): Promise<{ date: string; count: number }[]> {
  const db = getDb();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const rows = await db
    .select({
      date: sql<string>`to_char(${pageViews.createdAt}, 'YYYY-MM-DD')`,
      count: sql<number>`count(*)::int`,
    })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(sql`to_char(${pageViews.createdAt}, 'YYYY-MM-DD')`)
    .orderBy(sql`to_char(${pageViews.createdAt}, 'YYYY-MM-DD')`);

  return rows;
}

export async function countPageViewsSince(days = 30): Promise<number> {
  const db = getDb();
  const since = new Date();
  since.setDate(since.getDate() - days);
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since));
  return rows[0]?.count ?? 0;
}

// ---------- admin users ----------

export type AdminUser = typeof adminUsers.$inferSelect;

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const db = getDb();
  const rows = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  return rows[0] ?? null;
}

export async function updateAdminPasswordHash(id: number, passwordHash: string): Promise<void> {
  const db = getDb();
  await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, id));
}

export async function countPublishedPrograms(): Promise<number> {
  const db = getDb();
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(programs)
    .where(eq(programs.published, true));
  return rows[0]?.count ?? 0;
}

export async function countPublishedBooks(): Promise<number> {
  const db = getDb();
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(books)
    .where(eq(books.published, true));
  return rows[0]?.count ?? 0;
}

export type { SiteStat, MethodStep, SocialLinks };
