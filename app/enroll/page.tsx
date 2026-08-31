import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";
import EnrollmentForm from "@/app/components/EnrollmentForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enrollment | The Marouf Method",
  description:
    "Reserve your place in a Cambridge Biology or Psychology program with Dr. Kareem Wael Maarouf.",
};

export default async function EnrollPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const { program } = await searchParams;
  const { settings, programs, navItems, books, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section enroll-section">
        <div className="form-split">
          <div className="form-aside">
            <p className="eyebrow">ENROLLMENT</p>
            <span className="eyebrow-rule" />
            <h2>
              Reserve Your Place.
              <span>Begin The Method.</span>
            </h2>
            <p>
              Places are limited so every student keeps direct access to Dr. Kareem. Share the
              student and parent details and we&apos;ll confirm the schedule with you personally.
            </p>
            <span className="form-aside-rule" />
            <ul className="form-aside-list">
              <li>Structured Cambridge &amp; Edexcel programs</li>
              <li>Parent kept informed throughout</li>
              <li>Exam-focused academic strategy</li>
            </ul>
            <p className="form-aside-badge">NO ONLINE PAYMENT &middot; LIMITED PLACES</p>
          </div>

          <div className="form-main">
            <EnrollmentForm
              programOptions={programs.map((item) => item.title)}
              initialProgram={program}
              eyebrow="RESERVE YOUR PLACE"
              title="Enroll With"
              titleAccent="The Marouf Method."
              lede="Complete the student and parent details below. We'll be in touch to confirm the schedule and finish registration — nothing is paid online."
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
