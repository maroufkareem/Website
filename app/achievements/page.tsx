import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

const title = "Achievements | The Marouf Method";
const description = "Credentials and academic achievements behind Dr. Kareem Wael Maarouf's teaching.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/achievements" },
  openGraph: {
    title,
    description,
    url: "/achievements",
    images: [{ url: "/marouf-assets/doctor-portrait.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/marouf-assets/doctor-portrait.jpeg"],
  },
};

export default async function AchievementsPage() {
  const { settings, achievements, navItems, programs, books, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section achievements">
        <p className="eyebrow gold center">CREDENTIALS & ACHIEVEMENTS</p>
        <h2 className="center">Academic Excellence <span>Behind Every Lesson</span></h2>
        <div className="achievement-grid">
          {achievements.map((achievement) => (
            <article key={achievement.title}>
              <h3>{achievement.title}</h3>
              <p>{achievement.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section quote-band">
        <blockquote>
          &quot;Biology comes to life when every detail connects,<br /> every concept finds meaning, and understanding turns knowledge into mastery.&quot;
          <cite>Dr. Kareem Wael Maarouf <span>FOUNDER - THE MAROUF METHOD</span></cite>
        </blockquote>
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
