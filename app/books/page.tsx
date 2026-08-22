import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Books | The Marouf Method",
  description: "Premium Biology and Psychology guides by Dr. Kareem Wael Maarouf — Cambridge & Pearson Edexcel.",
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
              <img src={book.imageUrl} alt={book.title} />
              <div>
                <span>{book.label}</span>
                <h3>{book.title}</h3>
                <p>{book.body}</p>
                <a className="order" href="/contact">ORDER NOW</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="featured">
        <div className="featured-images">
          <p className="pill">NOW AVAILABLE</p>
          <img src={settings.featuredImage1Url} alt="Biology guide preview" />
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
