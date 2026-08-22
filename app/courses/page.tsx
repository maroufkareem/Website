import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Courses | The Marouf Method",
  description: "Cambridge Biology and Psychology O Level programs by Dr. Kareem Wael Maarouf.",
};

export default async function CoursesPage() {
  const { settings, programs, navItems, books, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section programs">
        <p className="eyebrow gold center">PREMIUM ACADEMIC PROGRAMS</p>
        <h2 className="center">Structured Learning. <span>Stronger Results.</span></h2>
        <div className="program-grid">
          {programs.map((program) => (
            <article className="program-card" key={program.title}>
              <div className="program-top">
                <span>{program.label}</span>
                {program.price && <strong>{program.price}</strong>}
              </div>
              <h3>{program.title}</h3>
              <p className="meta">{program.meta}</p>
              <p className="date">{program.date}</p>
              <p>{program.body}</p>
              <div className="actions small">
                <a className="btn primary" href="/contact">RESERVE YOUR PLACE</a>
              </div>
            </article>
          ))}
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
