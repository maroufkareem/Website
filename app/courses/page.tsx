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
              {/* Reference order: title, then label, then meta, with the
                  price sitting beside the date rather than above the title. */}
              <h3>{program.title}</h3>
              <p className="program-label">{program.label}</p>
              <p className="meta">{program.meta}</p>
              <div className="program-daterow">
                <p className="date">{program.date}</p>
                {program.price && <strong>{program.price}</strong>}
              </div>
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
