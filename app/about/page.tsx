import type { Metadata } from "next";
import Image from "next/image";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | The Marouf Method",
  description: "About Dr. Kareem Wael Maarouf — dentist by profession, Biology and Psychology educator by passion.",
};

export default async function AboutPage() {
  const { settings, aboutCredentials, navItems, programs, books, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section about-section">
        <div className="about">
        <div className="portrait-frame">
          <div className="portrait-wrap">
            <Image
              src={settings.aboutPortraitUrl}
              alt="Dr. Kareem Wael Maarouf"
              width={1100}
              height={1375}
              sizes="(max-width: 820px) 100vw, 540px"
              priority
            />
          </div>
        </div>
        <div>
          <p className="eyebrow gold">{settings.aboutEyebrow}</p>
          <span className="eyebrow-rule" />
          <h2>Dentist by<br /><span>Profession.</span><br />Educator by<br /><span>Passion.</span></h2>
          <p>{settings.aboutParagraph1}</p>
          <p>{settings.aboutParagraph2}</p>
          <ul className="credentials">
            {aboutCredentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>
          <a className="btn secondary about-cta" href="/contact" data-open-trial>MEET DR. KAREEM</a>
        </div>
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
