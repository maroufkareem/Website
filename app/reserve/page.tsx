import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";
import ReservationForm from "@/app/components/ReservationForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reserve a Book | The Marouf Method",
  description:
    "Reserve a copy of Dr. Kareem Wael Maarouf's Biology and Psychology guides. No payment needed — we'll contact you to arrange collection.",
};

export default async function ReservePage({
  searchParams,
}: {
  searchParams: Promise<{ book?: string }>;
}) {
  const { book } = await searchParams;
  const { books, navItems, programs, contactPhone, contactEmail, whatsappHref, social, settings } =
    await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section reserve-section">
        <div className="reserve-inner">
          <div className="reserve-intro">
            <p className="eyebrow gold">RESERVE A COPY</p>
            <span className="eyebrow-rule" />
            <h2>
              Reserve your book.<br />
              <span>No payment needed.</span>
            </h2>
            <p>
              Tell us which guide you would like and how to reach you. We&apos;ll hold a copy and
              contact you to arrange collection — payment is settled in person.
            </p>
            <ul className="credentials">
              <li>No online payment</li>
              <li>Confirmation email sent instantly</li>
              <li>Collect from Atlas Bookstore</li>
            </ul>
          </div>

          <div className="reserve-form-wrap">
            <ReservationForm bookTitles={books.map((b) => b.title)} initialBook={book} />
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
