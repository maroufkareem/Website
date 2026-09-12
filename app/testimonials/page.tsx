import type { Metadata } from "next";
import Image from "next/image";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

const title = "Testimonials | The Marouf Method";
const description = "What students and parents say about learning with Dr. Kareem Wael Maarouf.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title,
    description,
    url: "/testimonials",
    images: [{ url: "/marouf-assets/hero.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/marouf-assets/hero.jpg"],
  },
};

export default async function TestimonialsPage() {
  const { settings, testimonials, navItems, programs, books, contactPhone, contactEmail, whatsappHref, social } =
    await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />
      <SiteHeader navItems={navItems} />

      <section className="section testimonials">
        <p className="eyebrow gold center">STUDENT EXPERIENCES</p>
        <h2 className="center">Learning That <span>Changes Confidence</span></h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.author + testimonial.body.slice(0, 10)}>
              <span className="mark">”</span>
              <p>{testimonial.body}</p>
              <strong>— {testimonial.author}</strong>
            </article>
          ))}
        </div>
        <div className="parent-note">
          <span>”</span>
          <p>Thank you for your effort with the students and for making them love the subject.</p>
          <strong>— PARENT FEEDBACK —</strong>
        </div>
      </section>

      <section className="section messages-section">
        <p className="eyebrow gold center">REAL MESSAGES</p>
        <h2 className="center">Straight From <span>The Students</span></h2>
        <p className="subhead">UNEDITED MESSAGES FROM STUDENTS AND PARENTS</p>
        <figure className="messages-shot">
          <Image
            src="/marouf-assets/testimonial-collage.jpg"
            alt="Collage of WhatsApp and Instagram messages from students and parents thanking Dr. Kareem after sessions and exams"
            width={1604}
            height={1136}
            sizes="(max-width: 820px) 100vw, 1100px"
          />
        </figure>
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
