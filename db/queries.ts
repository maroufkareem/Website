import { desc, eq, gte, sql } from "drizzle-orm";
import { getDb } from "./index";
import {
  achievements,
  adminUsers,
  books,
  enquiries,
  enrollments,
  bookReservations,
  quizzes,
  quizQuestions,
  quizAttempts,
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

// ---------- enrollments ----------

export type Enrollment = typeof enrollments.$inferSelect;

export async function createEnrollment(values: {
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  school?: string;
  country?: string;
  programInterest?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  goals?: string;
}): Promise<Enrollment> {
  const db = getDb();
  const [row] = await db
    .insert(enrollments)
    .values({
      studentName: values.studentName,
      studentEmail: values.studentEmail,
      studentPhone: values.studentPhone ?? "",
      school: values.school ?? "",
      country: values.country ?? "",
      programInterest: values.programInterest ?? "",
      parentName: values.parentName ?? "",
      parentPhone: values.parentPhone ?? "",
      parentEmail: values.parentEmail ?? "",
      goals: values.goals ?? "",
      status: "new",
    })
    .returning();
  return row;
}

export async function listEnrollments(): Promise<Enrollment[]> {
  const db = getDb();
  return db.select().from(enrollments).orderBy(desc(enrollments.createdAt));
}

export async function getRecentEnrollments(limit = 5): Promise<Enrollment[]> {
  const db = getDb();
  return db.select().from(enrollments).orderBy(desc(enrollments.createdAt)).limit(limit);
}

export async function updateEnrollmentStatus(
  id: number,
  status: "new" | "contacted" | "closed"
): Promise<void> {
  const db = getDb();
  await db.update(enrollments).set({ status }).where(eq(enrollments.id, id));
}

export async function deleteEnrollment(id: number): Promise<void> {
  const db = getDb();
  await db.delete(enrollments).where(eq(enrollments.id, id));
}

export async function countNewEnrollments(): Promise<number> {
  const db = getDb();
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(enrollments)
    .where(eq(enrollments.status, "new"));
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

// ---------- book reservations ----------

export type BookReservation = typeof bookReservations.$inferSelect;
export type ReservationStatus = "new" | "confirmed" | "collected" | "cancelled";

export async function createBookReservation(values: {
  bookId: number | null;
  bookTitle: string;
  name: string;
  email: string;
  phone: string;
  note: string;
}): Promise<BookReservation> {
  const db = getDb();
  const rows = await db
    .insert(bookReservations)
    .values({
      bookId: values.bookId,
      bookTitle: values.bookTitle,
      name: values.name,
      email: values.email,
      phone: values.phone,
      note: values.note,
    })
    .returning();
  return rows[0];
}

export async function listBookReservations(): Promise<BookReservation[]> {
  const db = getDb();
  return db.select().from(bookReservations).orderBy(desc(bookReservations.createdAt));
}

export async function getRecentBookReservations(limit = 5): Promise<BookReservation[]> {
  const db = getDb();
  return db
    .select()
    .from(bookReservations)
    .orderBy(desc(bookReservations.createdAt))
    .limit(limit);
}

export async function updateBookReservationStatus(
  id: number,
  status: ReservationStatus
): Promise<void> {
  const db = getDb();
  await db.update(bookReservations).set({ status }).where(eq(bookReservations.id, id));
}

export async function deleteBookReservation(id: number): Promise<void> {
  const db = getDb();
  await db.delete(bookReservations).where(eq(bookReservations.id, id));
}

export async function countNewBookReservations(): Promise<number> {
  const db = getDb();
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(bookReservations)
    .where(eq(bookReservations.status, "new"));
  return rows[0]?.count ?? 0;
}

// ---------- quizzes ----------

export type Quiz = typeof quizzes.$inferSelect;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type QuizAttempt = typeof quizAttempts.$inferSelect;

/** Question as sent to the browser — correctIndex deliberately omitted. */
export type PublicQuizQuestion = {
  id: number;
  prompt: string;
  type: string;
  options: string[];
};

export async function listQuizzes(onlyPublished = false): Promise<Quiz[]> {
  const db = getDb();
  return db
    .select()
    .from(quizzes)
    .where(onlyPublished ? eq(quizzes.published, true) : undefined)
    .orderBy(quizzes.sortOrder, desc(quizzes.createdAt));
}

export async function getQuizById(id: number): Promise<Quiz | null> {
  const db = getDb();
  const rows = await db.select().from(quizzes).where(eq(quizzes.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getQuizBySlug(slug: string): Promise<Quiz | null> {
  const db = getDb();
  const rows = await db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function createQuiz(values: {
  slug: string;
  title: string;
  subject: string;
  description: string;
  passMark: number;
  published: boolean;
}): Promise<Quiz> {
  const db = getDb();
  const [row] = await db.insert(quizzes).values(values).returning();
  return row;
}

export async function updateQuiz(
  id: number,
  values: Partial<{
    slug: string;
    title: string;
    subject: string;
    description: string;
    passMark: number;
    published: boolean;
    sortOrder: number;
  }>
): Promise<void> {
  const db = getDb();
  await db.update(quizzes).set(values).where(eq(quizzes.id, id));
}

export async function deleteQuiz(id: number): Promise<void> {
  const db = getDb();
  // No FK cascade in the schema, so clear children explicitly.
  await db.delete(quizQuestions).where(eq(quizQuestions.quizId, id));
  await db.delete(quizAttempts).where(eq(quizAttempts.quizId, id));
  await db.delete(quizzes).where(eq(quizzes.id, id));
}

export async function listQuizQuestions(quizId: number): Promise<QuizQuestion[]> {
  const db = getDb();
  return db
    .select()
    .from(quizQuestions)
    .where(eq(quizQuestions.quizId, quizId))
    .orderBy(quizQuestions.sortOrder, quizQuestions.id);
}

/** Strips the answer key before anything reaches the browser. */
export function toPublicQuestions(rows: QuizQuestion[]): PublicQuizQuestion[] {
  return rows.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    type: q.type,
    options: q.options,
  }));
}

export async function replaceQuizQuestions(
  quizId: number,
  questions: {
    prompt: string;
    type: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[]
): Promise<void> {
  const db = getDb();
  await db.delete(quizQuestions).where(eq(quizQuestions.quizId, quizId));
  if (!questions.length) return;
  await db.insert(quizQuestions).values(
    questions.map((q, index) => ({
      quizId,
      prompt: q.prompt,
      type: q.type,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      sortOrder: index,
    }))
  );
}

export async function createQuizAttempt(values: {
  quizId: number;
  quizTitle: string;
  studentName: string;
  studentEmail: string;
  score: number;
  total: number;
  answers: number[];
}): Promise<QuizAttempt> {
  const db = getDb();
  const [row] = await db.insert(quizAttempts).values(values).returning();
  return row;
}

export async function listQuizAttempts(quizId?: number): Promise<QuizAttempt[]> {
  const db = getDb();
  return db
    .select()
    .from(quizAttempts)
    .where(quizId ? eq(quizAttempts.quizId, quizId) : undefined)
    .orderBy(desc(quizAttempts.createdAt));
}

export async function deleteQuizAttempt(id: number): Promise<void> {
  const db = getDb();
  await db.delete(quizAttempts).where(eq(quizAttempts.id, id));
}

export async function countQuizAttempts(): Promise<number> {
  const db = getDb();
  const rows = await db.select({ count: sql<number>`count(*)::int` }).from(quizAttempts);
  return rows[0]?.count ?? 0;
}

export async function countQuestionsByQuiz(): Promise<Record<number, number>> {
  const db = getDb();
  const rows = await db
    .select({ quizId: quizQuestions.quizId, count: sql<number>`count(*)::int` })
    .from(quizQuestions)
    .groupBy(quizQuestions.quizId);
  return Object.fromEntries(rows.map((r) => [r.quizId, r.count]));
}

export async function countAttemptsByQuiz(): Promise<Record<number, number>> {
  const db = getDb();
  const rows = await db
    .select({ quizId: quizAttempts.quizId, count: sql<number>`count(*)::int` })
    .from(quizAttempts)
    .groupBy(quizAttempts.quizId);
  return Object.fromEntries(rows.map((r) => [r.quizId, r.count]));
}

export type { SiteStat, MethodStep, SocialLinks };
