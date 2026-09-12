import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";
import ReservationForm from "@/app/components/ReservationForm";

export const dynamic = "force-dynamic";

const title = "Reserve a Book | The Marouf Method";
const description =
  "Reserve a copy of Dr. Kareem Wael Maarouf's Biology and Psychology guides. No payment needed — we'll contact you to arrange collection.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/reserve" },
  openGraph: {
    title,
    description,
    url: "/reserve",
    images: [{ url: "/marouf-assets/book-capsule-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/marouf-assets/book-capsule-cover.jpg"],
  },
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
        <div className="form-split">
          <div className="form-aside">
            <p className="eyebrow">RESERVE A COPY</p>
            <span className="eyebrow-rule" />
            <h2>
              Reserve your book.
              <span>No payment needed.</span>
            </h2>
            <p>
              Tell us which guide you would like and how to reach you. We&apos;ll hold a copy and
              contact you to arrange collection — payment is settled in person.
            </p>
            <span className="form-aside-rule" />
            <ul className="form-aside-list">
              <li>No online payment</li>
              <li>Confirmation email sent instantly</li>
              <li>Collect from Atlas Bookstore</li>
            </ul>
            <p className="form-aside-badge">NO PAYMENT &middot; NO COMMITMENT</p>
          </div>

          <div className="form-main">
            <ReservationForm
              bookTitles={books.map((b) => b.title)}
              initialBook={book}
              eyebrow="RESERVE YOUR COPY"
              title="Hold Your Book."
              titleAccent="Collect In Person."
              lede="Choose your guide and leave your details — we'll set a copy aside and confirm by email."
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
