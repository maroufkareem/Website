import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

const title = "Courses | The Marouf Method";
const description = "Cambridge Biology and Psychology O Level programs by Dr. Kareem Wael Maarouf.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/courses" },
  openGraph: {
    title,
    description,
    url: "/courses",
    images: [{ url: "/marouf-assets/hero.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/marouf-assets/hero.jpg"],
  },
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
              <p className="program-label">{program.label}</p>
              <h3>{program.title}</h3>
              {/* Rendered even when empty so cards with and without a price
                  keep the same rhythm and stay aligned across the row. */}
              <strong className="program-price">{program.price || "\u00a0"}</strong>
              <p className="meta">{program.meta}</p>
              <p className="date">{program.date}</p>
              <span className="program-rule" />
              <p>{program.body}</p>
              <div className="actions small">
                <a
                  className="btn primary"
                  href={`/enroll?program=${encodeURIComponent(program.title)}`}
                >
                  RESERVE YOUR PLACE
                </a>
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
