const navItems = [
  ["Home", "/"],
  ["About", "/about/"],
  ["Courses", "/courses/"],
  ["Books", "/books/"],
  ["Achievements", "/achievements/"],
  ["Testimonials", "/testimonials/"],
  ["Contact", "/contact/"],
  ["Quizzes", "/quizzes/"],
];

const stats = [
  ["5+", "YEARS OF TEACHING", "EXPERIENCE"],
  ["3", "PUBLISHED BIOLOGY", "BOOKS"],
  ["10-12", "ACADEMIC PROGRAM", "GRADES"],
  ["Bio & Psych", "SPECIALIZED SUBJECTS", ""],
];

const programs = [
  {
    label: "BIOLOGY",
    title: "Cambridge Biology O Level",
    price: "",
    meta: "GRADES 10, 11 & 12    ONLINE - 8-MONTH PROGRAM",
    date: "1 OCTOBER - 1 MAY",
    body: "A complete Cambridge Biology program designed to simplify difficult concepts, strengthen scientific understanding, and improve exam-answering skills.",
  },
  {
    label: "PSYCHOLOGY",
    title: "Cambridge Psychology O Level",
    price: "$400",
    meta: "GRADES 10, 11 & 12    ONLINE - 8-MONTH PROGRAM",
    date: "1 OCTOBER - 1 MAY",
    body: "A complete Psychology program designed to simplify key theories, strengthen analytical thinking, and improve structured exam-answering skills.",
  },
];

const steps = [
  ["01", "Understand", "Complex topics are broken down into clear, logical explanations that make sense on first encounter."],
  ["02", "Connect", "Scientific concepts are connected to real examples and visual learning for deeper retention."],
  ["03", "Practice", "Students apply what they learn through structured questions and guided revision sessions."],
  ["04", "Master", "Students build confidence, accuracy, and strong exam technique for lasting academic success."],
];

const books = [
  ["/marouf-assets/book-9.jpg", "Grade 9 - Cambridge", "Biology Core - Grade 9", "A clear, structured guide that simplifies core Biology concepts and supports confident learning throughout the year."],
  ["/marouf-assets/book-10.jpg", "Grade 10 - O Level", "Biology O Level - Grade 10", "A complete Biology guide with clear explanations, diagrams, revision support, and exam-focused practice."],
  ["/marouf-assets/book-capsule.png", "IGCSE BIOLOGY - REVISION GUIDE", "Marouf's Bio Capsule", "A focused revision guide that simplifies key Biology topics and strengthens exam preparation."],
  ["/marouf-assets/book-psych.jpg", "IGCSE - PSYCHOLOGY O LEVEL", "Psychology O Level", "A structured Psychology guide covering key concepts, clear explanations, and exam-focused learning."],
];

const achievements = [
  ["Human Biology Excellence", "Completed Human Biology with an excellent grade in the Faculty of Oral and Dental Medicine."],
  ["Bachelor of Dental Surgery", "Strong medical and scientific academic background from Future University in Egypt."],
  ["IGCSE Graduate", "Successfully completed the IGCSE requirements at Sahara International School."],
  ["Published Educational Resources", "Author of Biology Core Grade 9, Biology O Level Year 10, Marouf's Bio Capsule, and Psychology O Level Year 10 educational resources."],
];

const testimonials = [
  ["Biology used to be the subject I disliked most because I could not understand it. Now I genuinely look forward to every Biology session.", "BIOLOGY STUDENT"],
  ["Everything Dr. Kareem told us to focus on appeared in the exam, and the exam felt much easier than expected.", "O LEVEL BIOLOGY STUDENT"],
  ["Thank you for making Biology clearer, easier, and more enjoyable throughout the year. Your support made a real difference.", "GRADE 10 STUDENT"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="The Marouf Method home">
          <span className="brand-mark">M</span>
          <span>
            <strong>The Marouf Method</strong>
            <small>WHERE KNOWLEDGE BECOMES MASTERY</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map(([item, href]) => (
            <a href={href} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="/contact/">REGISTER NOW</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">CAMBRIDGE BIOLOGY & PSYCHOLOGY EDUCATION</p>
          <div className="doctor-card">
            <p className="doctor-name">DR. KAREEM WAEL MAAROUF</p>
            <p className="doctor-role">Dentist by Profession.<br /><span>Educator by Passion.</span></p>
          </div>
          <h1><span>Where</span><span>Knowledge</span><span>Becomes</span><span>Mastery</span></h1>
          <p className="hero-copy">Learn Biology and Psychology through clear explanations, premium academic resources, and exam-focused guidance by Dr. Kareem Wael Maarouf.</p>
          <p className="quote">"Understand More. Memorize Less."</p>
          <div className="actions">
            <a className="btn primary" href="#courses">EXPLORE COURSES</a>
            <a className="btn secondary" href="#books">DISCOVER BOOKS</a>
          </div>
        </div>
        <div className="hero-badges" aria-label="Program highlights">
          <span>GRADES 10-12</span>
          <span>ONLINE PROGRAMS</span>
          <span>CAMBRIDGE & O LEVEL</span>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map(([number, label, sub]) => (
          <div className="stat" key={number}>
            <strong>{number}</strong>
            <span>{label}</span>
            {sub && <small>{sub}</small>}
          </div>
        ))}
      </section>

      <section className="section about" id="about">
        <div className="portrait-wrap">
          <img src="/marouf-assets/doctor-portrait.jpeg" alt="Dr. Kareem Wael Maarouf" />
        </div>
        <div>
          <p className="eyebrow gold">ABOUT DR. KAREEM</p>
          <h2>Dentist by <span>Profession.</span><br />Educator by <span>Passion.</span></h2>
          <p>Dr. Kareem Wael Maarouf combines a strong medical and scientific background with years of teaching experience to make Biology and Psychology clear, engaging, and memorable.</p>
          <p>He focuses on understanding rather than memorization, helping students develop confidence, scientific thinking, and stronger exam performance.</p>
          <ul className="credentials">
            <li>BACHELOR OF DENTAL SURGERY</li>
            <li>EXCELLENCE IN HUMAN BIOLOGY</li>
            <li>BIOLOGY & PSYCHOLOGY EDUCATOR</li>
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
        <p className="eyebrow gold">TEACHING METHODOLOGY</p>
        <div className="method-head">
          <h2>The Marouf Method</h2>
          <p>A clearer path from complex concepts to confident answers.</p>
        </div>
        <div className="step-grid">
          {steps.map(([number, title, body]) => (
            <article className="step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section books" id="books">
        <p className="eyebrow gold center">PUBLISHED RESOURCES</p>
        <h2 className="center">Premium Biology & Psychology Resources</h2>
        <p className="subhead">CAMBRIDGE    PEARSON EDEXCEL    AVAILABLE AT ATLAS BOOKSTORE</p>
        <div className="book-grid">
          {books.map(([image, label, title, body]) => (
            <article className="book-card" key={title}>
              <img src={image} alt={title} />
              <span>{label}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <a className="order" href="#contact">ORDER NOW</a>
            </article>
          ))}
        </div>
      </section>

      <section className="featured">
        <div className="featured-images">
          <img src="/marouf-assets/clinic-1.jpg" alt="Biology guide preview" />
          <img src="/marouf-assets/clinic-2.jpg" alt="Biology guide second preview" />
        </div>
        <div>
          <p className="pill">NOW AVAILABLE</p>
          <p className="eyebrow gold">FEATURED BIOLOGY GUIDE</p>
          <h2>A Complete Biology <span>Companion</span></h2>
          <p>A comprehensive Year 10 Biology guide designed with clear explanations, visual summaries, comparison tables, diagrams, and organized syllabus coverage for maximum exam readiness.</p>
          <ul className="ticks">
            <li>28 organized chapters</li>
            <li>Visual summaries</li>
            <li>Comparison tables</li>
            <li>Clear definitions</li>
            <li>Exam-focused support</li>
          </ul>
        </div>
      </section>

      <section className="section achievements" id="achievements">
        <p className="eyebrow gold center">CREDENTIALS & ACHIEVEMENTS</p>
        <h2 className="center">Academic Excellence <span>Behind Every Lesson</span></h2>
        <div className="achievement-grid">
          {achievements.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <blockquote>
          "Biology comes to life when every detail connects,<br /> every concept finds meaning, and understanding turns knowledge into mastery."
          <cite>Dr. Kareem Wael Maarouf <span>FOUNDER - THE MAROUF METHOD</span></cite>
        </blockquote>
      </section>

      <section className="section testimonials" id="testimonials">
        <p className="eyebrow gold">STUDENT EXPERIENCES</p>
        <h2>Learning That <span>Changes Confidence</span></h2>
        <div className="testimonial-grid">
          {testimonials.map(([body, author]) => (
            <article key={author}>
              <span className="mark">"</span>
              <p>{body}</p>
              <strong>- {author}</strong>
            </article>
          ))}
        </div>
        <a className="btn secondary" href="#testimonials">READ MORE STUDENT STORIES</a>
        <div className="parent-note">
          <span>"</span>
          <p>Thank you for your effort with the students and for making them love the subject.</p>
          <strong>- PARENT FEEDBACK -</strong>
        </div>
      </section>

      <section className="enrollment" id="contact">
        <p className="eyebrow gold center">ENROLLMENT</p>
        <h2>Begin Your <span>Academic Journey</span></h2>
        <p>Reserve your place in The Marouf Method's Biology or Psychology program and build the understanding, confidence, and exam skills needed for lasting success.</p>
        <div className="actions">
          <a className="btn primary" href="mailto:maroufkareem0@gmail.com">REGISTER NOW</a>
          <a className="btn secondary" href="https://wa.me/201114626999">CHAT ON WHATSAPP</a>
        </div>
        <p className="contact-line">- 01114626999    - maroufkareem0@gmail.com</p>
      </section>

      <footer>
        <div>
          <h3>The Marouf Method</h3>
          <p>Premium Biology and<br />Psychology education focused<br />on clear understanding,<br />academic confidence, and<br />exam success.</p>
        </div>
        <div>
          <h4>QUICK LINKS</h4>
          {navItems.slice(0, 7).map(([item, href]) => <a href={href} key={item}>{item}</a>)}
        </div>
        <div>
          <h4>PROGRAMS</h4>
          <a href="#courses">Cambridge Biology O Level</a>
          <a href="#courses">Psychology O Level</a>
          <a href="#books">Grade 9 Biology Book</a>
          <a href="#books">Grade 10 Biology Book</a>
        </div>
        <div>
          <h4>CONTACT</h4>
          <a href="tel:01114626999">01114626999</a>
          <a href="mailto:maroufkareem0@gmail.com">maroufkareem0@gmail.com</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">TikTok</a>
          <a href="https://wa.me/201114626999">WhatsApp</a>
        </div>
        <div className="footer-bottom">
          <span>© The Marouf Method. All rights reserved.</span>
          <span>Where Knowledge Becomes Mastery</span>
        </div>
      </footer>
    </main>
  );
}
