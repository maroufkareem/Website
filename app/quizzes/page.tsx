import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quizzes | The Marouf Method",
  description: "Practice quizzes from The Marouf Method — coming soon.",
};

export default async function QuizzesPage() {
  const { settings, navItems, programs, books, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section" style={{ textAlign: "center" }}>
        <p className="eyebrow gold center">QUIZZES</p>
        <h2 className="center">Practice Quizzes <span>Coming Soon</span></h2>
        <p style={{ maxWidth: 560, margin: "0 auto 28px", color: "rgba(252,250,246,0.78)", fontSize: 16, fontWeight: 700 }}>
          Self-marking Biology and Psychology practice quizzes are on the way. In the meantime, get in touch and
          Dr. Kareem can point you to the right revision material for your grade.
        </p>
        <a className="btn primary" href="/contact">GET IN TOUCH</a>
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
