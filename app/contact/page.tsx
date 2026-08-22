import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";
import ContactForm from "@/app/components/ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | The Marouf Method",
  description: "Reserve your place in The Marouf Method's Biology or Psychology program.",
};

export default async function ContactPage() {
  const { settings, programs, navItems, books, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="enrollment">
        <p className="eyebrow gold center">ENROLLMENT</p>
        <h2>Begin Your <span>Academic Journey</span></h2>
        <p>Reserve your place in The Marouf Method&apos;s Biology or Psychology program and build the understanding, confidence, and exam skills needed for lasting success.</p>
        <div className="actions">
          <a className="btn primary" href={`mailto:${contactEmail}`}>REGISTER NOW</a>
          <a className="btn whatsapp" href={whatsappHref}>CHAT ON WHATSAPP</a>
        </div>
        <p className="contact-line">- {contactPhone}    - {contactEmail}</p>
        <ContactForm programOptions={programs.map((program) => program.title)} />
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
