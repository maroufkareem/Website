import type { Metadata } from "next";
import { getSiteData } from "@/app/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import PageViewBeacon from "@/app/components/PageViewBeacon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials | The Marouf Method",
  description: "What students and parents say about learning with Dr. Kareem Wael Maarouf.",
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
              <span className="mark">&quot;</span>
              <p>{testimonial.body}</p>
              <strong>- {testimonial.author}</strong>
            </article>
          ))}
        </div>
        <div className="parent-note">
          <span>&quot;</span>
          <p>Thank you for your effort with the students and for making them love the subject.</p>
          <strong>- PARENT FEEDBACK -</strong>
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
