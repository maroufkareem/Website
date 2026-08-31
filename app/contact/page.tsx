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
          <a className="btn primary" href="#book">REGISTER NOW</a>
          <a className="btn whatsapp" href={whatsappHref}>CHAT ON WHATSAPP</a>
        </div>
        <p className="contact-line">- {contactPhone}    - {contactEmail}</p>

        <div className="form-split" id="book">
          <div className="form-aside">
            <p className="eyebrow">COMPLIMENTARY SESSION</p>
            <span className="eyebrow-rule" />
            <h2>
              Experience
              <span>The Marouf Method</span>
            </h2>
            <p>
              Discover how Biology and Psychology can become clearer, easier, and more enjoyable
              through understanding — not memorization.
            </p>
            <span className="form-aside-rule" />
            <ul className="form-aside-list">
              <li>Personalized learning guidance</li>
              <li>Clear explanation of difficult concepts</li>
              <li>Exam-focused academic strategy</li>
            </ul>
            <p className="form-aside-badge">100% FREE &middot; NO COMMITMENT</p>
          </div>

          <div className="form-main">
            <ContactForm
              eyebrow="BOOK YOUR FREE TRIAL"
              title="Start With One Session."
              titleAccent="See The Difference."
              lede="Reserve a complimentary trial session with Dr. Kareem and experience a learning approach built around understanding, confidence, and exam success."
            />
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
