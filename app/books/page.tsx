import type { Metadata } from "next";
import Image from "next/image";
import { getSiteData } from "@/app/lib/site-data";
import { keepLastWordTogether } from "@/app/lib/text";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

const title = "Books | The Marouf Method";
const description = "Premium Biology and Psychology guides by Dr. Kareem Wael Maarouf — Cambridge & Pearson Edexcel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/books" },
  openGraph: {
    title,
    description,
    url: "/books",
    images: [{ url: "/marouf-assets/book-capsule-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/marouf-assets/book-capsule-cover.jpg"],
  },
};

export default async function BooksPage() {
  const { settings, books, featuredChecklist, navItems, programs, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section books">
        <p className="eyebrow gold center">PUBLISHED RESOURCES</p>
        <h2 className="center">Premium Biology & Psychology Resources</h2>
        <p className="subhead">CAMBRIDGE    PEARSON EDEXCEL    AVAILABLE AT ATLAS BOOKSTORE</p>
        <div className="book-grid">
          {books.map((book) => (
            <article className="book-card" key={book.title}>
              <Image src={book.imageUrl} alt={book.title} width={370} height={478} sizes="185px" />
              <div>
                <span>{book.label}</span>
                <h3>{keepLastWordTogether(book.title)}</h3>
                <p>{book.body}</p>
                <a className="order" href={`/reserve?book=${encodeURIComponent(book.title)}`}>RESERVE NOW</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="featured">
        <div className="featured-images">
          <p className="pill">NOW AVAILABLE</p>
          <Image
            src={settings.featuredImage1Url}
            alt="Biology guide preview"
            width={920}
            height={1280}
            sizes="(max-width: 820px) 100vw, 570px"
          />
        </div>
        <div>
          <p className="eyebrow gold">{settings.featuredEyebrow}</p>
          <h2>A Complete Biology <span>Companion</span></h2>
          <p>{settings.featuredBody}</p>
          <ul className="ticks">
            {featuredChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
