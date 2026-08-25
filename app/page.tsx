import { getSiteData } from "@/app/lib/site-data";
import PageViewBeacon from "@/app/components/PageViewBeacon";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

// The reference renders these as solid glyphs, not hairline outlines.
const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "currentColor",
};

const badgeIcons = [
  <svg key="cap" {...iconProps} aria-hidden="true">
    <path d="M12 2.7 0.9 8.2l11.1 5.5 9.1-4.5v5.6a1.2 1.2 0 1 0 1.9 0V8.2L12 2.7Z" />
    <path d="M5 12.1v3.6c0 1.9 3.1 3.4 7 3.4s7-1.5 7-3.4v-3.6l-7 3.5-7-3.5Z" />
  </svg>,
  <svg key="monitor" {...iconProps} aria-hidden="true">
    <path d="M2.6 3.5h18.8c.9 0 1.6.7 1.6 1.6v9.6c0 .9-.7 1.6-1.6 1.6h-8.5v2.6h3.4c.5 0 .9.4.9.9s-.4.9-.9.9H7.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h3.4v-2.6H2.6c-.9 0-1.6-.7-1.6-1.6V5.1c0-.9.7-1.6 1.6-1.6Z" />
  </svg>,
  <svg key="badge" {...iconProps} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.2 1.8h11.6c1.2 0 2.2 1 2.2 2.2v16c0 1.2-1 2.2-2.2 2.2H6.2c-1.2 0-2.2-1-2.2-2.2v-16c0-1.2 1-2.2 2.2-2.2Zm3.1 2.4a.8.8 0 0 0-.8.8c0 .5.4.8.8.8h5.4a.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8H9.3ZM12 8.4a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm-4.3 9.9c0-2 1.9-3.4 4.3-3.4s4.3 1.4 4.3 3.4v.6H7.7v-.6Z"
    />
  </svg>,
];

// The public site reads all content from the database at request time, so
// it must never be statically generated at build time (there's no live DB
// during `next build` in some environments, and content should always be
// fresh after an admin edit).
export const dynamic = "force-dynamic";

export default async function Home() {
  const {
    settings,
    programs,
    books,
    achievements,
    testimonials,
    navItems,
    stats,
    methodSteps,
    aboutCredentials,
    heroBadges,
    featuredChecklist,
    social,
    whatsappHref,
    contactEmail,
    contactPhone,
  } = await getSiteData();

  return (
    <main className="site">
      <PageViewBeacon />

      <SiteHeader navItems={navItems} />

      <section
        className="hero"
        id="home"
        style={{ "--hero-image": `url(${settings.heroImageUrl})` } as React.CSSProperties}
      >
        <div className="hero-photo-mobile" />

        {/* Floats over the photo on desktop; hidden below 821px, where the
            inline copy inside .hero-content takes over instead (see CSS). */}
        <div className="doctor-card doctor-card-float">
          <p className="doctor-name">{settings.heroDoctorName}</p>
          <p className="doctor-role">{settings.heroDoctorRole}<br /><span>Educator by Passion.</span></p>
        </div>

        <div className="hero-content">
          <p className="eyebrow">{settings.heroEyebrow}</p>
          <div className="doctor-card doctor-card-inline">
            <p className="doctor-name">{settings.heroDoctorName}</p>
            <p className="doctor-role">{settings.heroDoctorRole}<br /><span>Educator by Passion.</span></p>
          </div>
          <h1><span>Where</span><span>Knowledge</span><span>Becomes</span><span>Mastery</span></h1>
          <p className="hero-copy">{settings.heroCopy}</p>
          <p className="quote">{settings.heroQuote}</p>
          <div className="actions">
            <a className="btn primary" href="/courses">EXPLORE COURSES</a>
            <a className="btn secondary" href="/books">DISCOVER BOOKS</a>
          </div>
        </div>
        <div className="hero-badges" aria-label="Program highlights">
          {heroBadges.map((badge, index) => (
            <span key={badge}>
              {badgeIcons[index % badgeIcons.length]}
              {badge}
            </span>
          ))}
        </div>
      </section>

      <section className="stats-grid">
        <div className="stats-grid-inner">
          {stats.map((stat) => (
            <div className="stat" key={stat.number + stat.label}>
              <strong>{stat.number}</strong>
              {/* Label and sub read as one flowing line on the reference, not
                  two stacked blocks. */}
              <span>{stat.sub ? `${stat.label} ${stat.sub}` : stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about">
        <div className="portrait-frame">
          <div className="portrait-wrap">
            <img src={settings.aboutPortraitUrl} alt="Dr. Kareem Wael Maarouf" />
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
          <a className="btn secondary about-cta" href="/achievements">MEET DR. KAREEM</a>
        </div>
        </div>
      </section>

      <section className="section programs" id="courses">
        <p className="eyebrow gold center">PREMIUM ACADEMIC PROGRAMS</p>
        <h2 className="center">Structured Learning. <span>Stronger Results.</span></h2>
        <div className="program-grid">
          {programs.map((program) => (
            <article className="program-card" key={program.title}>
              {/* Reference order: title, then label, then meta, with the
                  price sitting beside the date rather than above the title. */}
              <h3>{program.title}</h3>
              <p className="program-label">{program.label}</p>
              <p className="meta">{program.meta}</p>
              <div className="program-daterow">
                <p className="date">{program.date}</p>
                {program.price && <strong>{program.price}</strong>}
              </div>
              <p>{program.body}</p>
              <div className="actions small">
                <a className="btn secondary" href="/courses">VIEW PROGRAM</a>
                <a className="btn primary" href="/contact">RESERVE YOUR PLACE</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section method">
        <p className="eyebrow gold center">TEACHING METHODOLOGY</p>
        <div className="method-head">
          <h2>The Marouf Method</h2>
          <p>A clearer path from complex concepts to confident answers.</p>
        </div>
        <div className="step-grid">
          {methodSteps.map((step) => (
            <article className="step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section books" id="books">
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

      <section className="section achievements" id="achievements">
        <p className="eyebrow gold center">CREDENTIALS & ACHIEVEMENTS</p>
        <h2 className="center">Academic Excellence<br /><span>Behind Every Lesson</span></h2>
        <div className="achievement-grid">
          {achievements.map((achievement) => (
            <article key={achievement.title}>
              <h3>{achievement.title}</h3>
              <p>{achievement.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section quote-band">
        <blockquote>
          <span className="mark">”</span>
          Biology comes to life when every detail connects,<br /> every concept finds meaning, and understanding turns knowledge into mastery.
          <cite>Dr. Kareem Wael Maarouf <span>FOUNDER · THE MAROUF METHOD</span></cite>
        </blockquote>
      </section>

      <section className="section testimonials" id="testimonials">
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
        <div className="center">
          <a className="btn secondary" href="/testimonials">READ MORE STUDENT STORIES</a>
        </div>
        <div className="parent-note">
          <span>”</span>
          <p>Thank you for your effort with the students and for making them love the subject.</p>
          <strong>— PARENT FEEDBACK —</strong>
        </div>
      </section>

      <section className="enrollment" id="contact">
        <p className="eyebrow gold center">ENROLLMENT</p>
        <h2>Begin Your <span>Academic Journey</span></h2>
        <p>Reserve your place in The Marouf Method’s Biology or Psychology program and build the understanding, confidence, and exam skills needed for lasting success.</p>
        <div className="actions">
          <a className="btn primary" href={`mailto:${contactEmail}`}>REGISTER NOW</a>
          <a className="btn whatsapp" href={whatsappHref}>● CHAT ON WHATSAPP</a>
        </div>
        <p className="contact-line">— {contactPhone}    — {contactEmail}</p>
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
