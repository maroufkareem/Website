import type { Metadata } from "next";
import Link from "next/link";
import { getSiteData } from "@/app/lib/site-data";
import { listQuizzes, countQuestionsByQuiz } from "@/db/queries";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quizzes | The Marouf Method",
  description:
    "Practice Biology and Psychology quizzes from Dr. Kareem Wael Maarouf — instant marking and feedback.",
};

export default async function QuizzesPage() {
  const { settings, navItems, programs, books, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();
  const [quizzes, questionCounts] = await Promise.all([
    listQuizzes(true).catch(() => []),
    countQuestionsByQuiz().catch(() => ({} as Record<number, number>)),
  ]);

  // A quiz with no questions cannot be taken, so keep it off the list.
  const available = quizzes.filter((quiz) => (questionCounts[quiz.id] ?? 0) > 0);

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section quizzes-section">
        <p className="eyebrow gold center">PRACTICE QUIZZES</p>
        <h2 className="center">Test What You Know</h2>
        <p className="subhead">INSTANT MARKING &nbsp; FEEDBACK ON EVERY ANSWER</p>

        {available.length === 0 ? (
          <div className="quiz-empty">
            <p>
              No quizzes are open right now. Check back soon, or get in touch and Dr. Kareem can
              point you to the right revision material.
            </p>
            <a className="btn secondary" href="/contact">
              GET IN TOUCH
            </a>
          </div>
        ) : (
          <div className="quiz-grid">
            {available.map((quiz) => (
              <article className="quiz-card" key={quiz.id}>
                {quiz.subject && <p className="quiz-card-label">{quiz.subject}</p>}
                <h3>{quiz.title}</h3>
                {quiz.description && <p className="quiz-card-body">{quiz.description}</p>}
                <p className="quiz-card-meta">
                  {questionCounts[quiz.id]} question{questionCounts[quiz.id] === 1 ? "" : "s"} ·
                  pass mark {quiz.passMark}%
                </p>
                <Link className="btn primary" href={`/quizzes/${quiz.slug}`}>
                  START QUIZ
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <SiteFooter
        navItems={navItems}
        programs={programs}
        books={books}
        footerBlurb={settings.footerBlurb}
        contactPhone={contactPhone}
        contactEmail={contactEmail}
        whatsappHref={whatsappHref}
        social={social}
      />
    </main>
  );
}
