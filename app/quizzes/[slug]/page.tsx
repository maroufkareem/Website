import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteData } from "@/app/lib/site-data";
import { getQuizBySlug, listQuizQuestions, toPublicQuestions } from "@/db/queries";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";
import QuizRunner from "@/app/components/QuizRunner";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await getQuizBySlug(slug).catch(() => null);
  return {
    title: quiz ? `${quiz.title} | The Marouf Method` : "Quiz | The Marouf Method",
    description: quiz?.description || "Practice quiz from The Marouf Method.",
  };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { settings, navItems, programs, books, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();

  const quiz = await getQuizBySlug(slug).catch(() => null);
  if (!quiz || !quiz.published) notFound();

  const questions = await listQuizQuestions(quiz.id).catch(() => []);
  if (!questions.length) notFound();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section quiz-take-section">
        <div className="quiz-take-inner">
          <Link className="quiz-back" href="/quizzes">
            ← All quizzes
          </Link>
          {quiz.subject && <p className="eyebrow gold">{quiz.subject}</p>}
          <h2>{quiz.title}</h2>
          {quiz.description && <p className="quiz-take-intro">{quiz.description}</p>}

          {/* toPublicQuestions strips correctIndex — the answer key is never
              serialised into the page. */}
          <QuizRunner
            slug={quiz.slug}
            passMark={quiz.passMark}
            questions={toPublicQuestions(questions)}
          />
        </div>
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
