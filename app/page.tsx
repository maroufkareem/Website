import {
  getAchievements,
  getBooks,
  getNavItems,
  getPrograms,
  getSiteSettings,
  getTestimonials,
} from "@/db/queries";
import {
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_BOOKS,
  DEFAULT_NAV_ITEMS,
  DEFAULT_PROGRAMS,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TESTIMONIALS,
} from "@/app/lib/defaults";
import ContactForm from "@/app/components/ContactForm";
import PageViewBeacon from "@/app/components/PageViewBeacon";
import MobileNav from "@/app/components/MobileNav";

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const badgeIcons = [
  <svg key="cap" {...iconProps} aria-hidden="true">
    <path d="M12 3 2 8l10 5 10-5-10-5Z" />
    <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
  </svg>,
  <svg key="monitor" {...iconProps} aria-hidden="true">
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M8 20h8M12 16v4" />
  </svg>,
  <svg key="badge" {...iconProps} aria-hidden="true">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M9 21v-3.5a3 3 0 0 1 6 0V21" />
  </svg>,
];

// The public site reads all content from the database at request time, so
// it must never be statically generated at build time (there's no live DB
// during `next build` in some environments, and content should always be
// fresh after an admin edit).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [settingsRow, programsRows, booksRows, achievementsRows, testimonialsRows, navRows] =
    await Promise.all([
      getSiteSettings().catch(() => null),
      getPrograms().catch(() => []),
      getBooks().catch(() => []),
      getAchievements().catch(() => []),
      getTestimonials().catch(() => []),
      getNavItems().catch(() => []),
    ]);

  const settings = settingsRow ?? DEFAULT_SITE_SETTINGS;
  const programs = programsRows.length > 0 ? programsRows : DEFAULT_PROGRAMS;
  const books = booksRows.length > 0 ? booksRows : DEFAULT_BOOKS;
  const achievements = achievementsRows.length > 0 ? achievementsRows : DEFAULT_ACHIEVEMENTS;
  const testimonials = testimonialsRows.length > 0 ? testimonialsRows : DEFAULT_TESTIMONIALS;
  const navItems = navRows.length > 0 ? navRows : DEFAULT_NAV_ITEMS;
  const stats = settings.stats?.length ? settings.stats : DEFAULT_SITE_SETTINGS.stats;
  const methodSteps = settings.methodSteps?.length ? settings.methodSteps : DEFAULT_SITE_SETTINGS.methodSteps;
  const aboutCredentials = settings.aboutCredentials?.length
    ? settings.aboutCredentials
    : DEFAULT_SITE_SETTINGS.aboutCredentials;
  const heroBadges = settings.heroBadges?.length ? settings.heroBadges : DEFAULT_SITE_SETTINGS.heroBadges;
  const featuredChecklist = settings.featuredChecklist?.length
    ? settings.featuredChecklist
    : DEFAULT_SITE_SETTINGS.featuredChecklist;
  const social = { ...DEFAULT_SITE_SETTINGS.socialLinks, ...(settings.socialLinks ?? {}) };
  const whatsappHref = settings.contactWhatsapp || DEFAULT_SITE_SETTINGS.contactWhatsapp;
  const contactEmail = settings.contactEmail || DEFAULT_SITE_SETTINGS.contactEmail;
  const contactPhone = settings.contactPhone || DEFAULT_SITE_SETTINGS.contactPhone;

  return (
    <main className="site">
      <PageViewBeacon />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="The Marouf Method home">
          <span className="brand-mark">
            <span className="brand-mark-script">Kareem</span>
            <span className="brand-mark-caption">MAROUF</span>
          </span>
          <span>
            <strong>The Marouf Method</strong>
            <small>WHERE KNOWLEDGE BECOMES MASTERY</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">REGISTER NOW</a>
        <MobileNav navItems={navItems} />
      </header>

      <section className="hero" id="home">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">{settings.heroEyebrow}</p>
          <div className="doctor-card">
            <p className="doctor-name">{settings.heroDoctorName}</p>
            <p className="doctor-role">{settings.heroDoctorRole}<br /><span>Educator by Passion.</span></p>
          </div>
          <h1><span>Where</span><span>Knowledge</span><span>Becomes</span><span>Mastery</span></h1>
          <p className="hero-copy">{settings.heroCopy}</p>
          <p className="quote">{settings.heroQuote}</p>
          <div className="actions">
            <a className="btn primary" href="#courses">EXPLORE COURSES</a>
            <a className="btn secondary" href="#books">DISCOVER BOOKS</a>
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
        {stats.map((stat) => (
          <div className="stat" key={stat.number + stat.label}>
            <strong>{stat.number}</strong>
            <span>{stat.label}</span>
            {stat.sub && <small>{stat.sub}</small>}
          </div>
        ))}
      </section>

      <section className="section about" id="about">
        <div className="portrait-wrap">
          <img src={settings.aboutPortraitUrl} alt="Dr. Kareem Wael Maarouf" />
        </div>
        <div>
          <p className="eyebrow gold">{settings.aboutEyebrow}</p>
          <h2>Dentist by <span>Profession.</span><br />Educator by <span>Passion.</span></h2>
          <p>{settings.aboutParagraph1}</p>
          <p>{settings.aboutParagraph2}</p>
          <ul className="credentials">
            {aboutCredentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>
          <a className="btn primary" href="#achievements">MEET DR. KAREEM</a>
        </div>
      </section>

      <section className="section programs" id="courses">
        <p className="eyebrow gold center">PREMIUM ACADEMIC PROGRAMS</p>
        <h2 className="center">Structured Learning. <span>Stronger Results.</span></h2>
        <div className="program-grid">
          {programs.map((program) => (
            <article className="program-card" key={program.title}>
              <div className="program-top">
                <span>{program.label}</span>
                {program.price && <strong>{program.price}</strong>}
              </div>
              <h3>{program.title}</h3>
              <p className="meta">{program.meta}</p>
              <p className="date">{program.date}</p>
              <p>{program.body}</p>
              <div className="actions small">
                <a className="btn secondary" href="#courses">VIEW PROGRAM</a>
                <a className="btn primary" href="#contact">RESERVE YOUR PLACE</a>
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
                <a className="order" href="#contact">ORDER NOW</a>
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
        <h2 className="center">Academic Excellence <span>Behind Every Lesson</span></h2>
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
          &quot;Biology comes to life when every detail connects,<br /> every concept finds meaning, and understanding turns knowledge into mastery.&quot;
          <cite>Dr. Kareem Wael Maarouf <span>FOUNDER - THE MAROUF METHOD</span></cite>
        </blockquote>
      </section>

      <section className="section testimonials" id="testimonials">
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
        <div className="center">
          <a className="btn secondary" href="#testimonials">READ MORE STUDENT STORIES</a>
        </div>
        <div className="parent-note">
          <span>&quot;</span>
          <p>Thank you for your effort with the students and for making them love the subject.</p>
          <strong>- PARENT FEEDBACK -</strong>
        </div>
      </section>

      <section className="enrollment" id="contact">
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

      <footer>
        <div>
          <h3>The Marouf Method</h3>
          <p>{settings.footerBlurb}</p>
        </div>
        <div>
          <h4>QUICK LINKS</h4>
          {navItems.slice(0, 7).map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
        </div>
        <div>
          <h4>PROGRAMS</h4>
          {programs.slice(0, 2).map((program) => (
            <a href="#courses" key={program.title}>{program.title}</a>
          ))}
          {books.slice(0, 2).map((book) => (
            <a href="#books" key={book.title}>{book.title}</a>
          ))}
        </div>
        <div>
          <h4>CONTACT</h4>
          <a href={`tel:${contactPhone}`}>{contactPhone}</a>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <a href={social.instagram || "#"}>Instagram</a>
          <a href={social.linkedin || "#"}>LinkedIn</a>
          <a href={social.tiktok || "#"}>TikTok</a>
          <a href={whatsappHref}>WhatsApp</a>
        </div>
        <div className="footer-bottom">
          <span>© The Marouf Method. All rights reserved.</span>
          <span>Where Knowledge Becomes Mastery</span>
        </div>
      </footer>
    </main>
  );
}
