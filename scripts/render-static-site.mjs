import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

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

const routeTargets = {
  "/": "home",
  "/about/": "about",
  "/courses/": "courses",
  "/books/": "books",
  "/achievements/": "achievements",
  "/testimonials/": "testimonials",
  "/contact/": "contact",
  "/quizzes/": "quizzes",
};

function stripBuildOnlyCss(css) {
  return css
    .split("\n")
    .filter((line) => !line.includes('@import "tailwindcss"'))
    .join("\n");
}

function navHtml() {
  return navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
}

function renderPage(css) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The Marouf Method | Cambridge Biology & Psychology</title>
  <meta name="description" content="Premium Cambridge Biology and Psychology education by Dr. Kareem Wael Maarouf.">
  <style>${stripBuildOnlyCss(css)}</style>
</head>
<body>
  <main>
    <header class="site-header">
      <a class="brand" href="/" aria-label="The Marouf Method home">
        <span class="brand-mark">M</span>
        <span>
          <strong>The Marouf Method</strong>
          <small>WHERE KNOWLEDGE BECOMES MASTERY</small>
        </span>
      </a>
      <nav aria-label="Primary navigation">${navHtml()}</nav>
      <a class="header-cta" href="/contact/" data-track="register_header">REGISTER NOW</a>
    </header>

    <section class="hero" id="home">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <p class="eyebrow">CAMBRIDGE BIOLOGY & PSYCHOLOGY EDUCATION</p>
        <div class="doctor-card">
          <p class="doctor-name">DR. KAREEM WAEL MAAROUF</p>
          <p class="doctor-role">Dentist by Profession.<br><span>Educator by Passion.</span></p>
        </div>
        <h1><span>Where</span><span>Knowledge</span><span>Becomes</span><span>Mastery</span></h1>
        <p class="hero-copy">Learn Biology and Psychology through clear explanations, premium academic resources, and exam-focused guidance by Dr. Kareem Wael Maarouf.</p>
        <p class="quote">"Understand More. Memorize Less."</p>
        <div class="actions">
          <a class="btn primary" href="/courses/" data-track="explore_courses">EXPLORE COURSES</a>
          <a class="btn secondary" href="/books/" data-track="discover_books">DISCOVER BOOKS</a>
        </div>
      </div>
      <div class="hero-badges" aria-label="Program highlights">
        <span>GRADES 10-12</span><span>ONLINE PROGRAMS</span><span>CAMBRIDGE & O LEVEL</span>
      </div>
    </section>

    <section class="stats-grid">
      ${stats.map(([number, label, sub]) => `<div class="stat"><strong>${number}</strong><span>${label}</span>${sub ? `<small>${sub}</small>` : ""}</div>`).join("")}
    </section>

    <section class="section about" id="about">
      <div class="portrait-wrap"><img src="/marouf-assets/doctor-portrait.jpeg" alt="Dr. Kareem Wael Maarouf"></div>
      <div>
        <p class="eyebrow gold">ABOUT DR. KAREEM</p>
        <h2>Dentist by <span>Profession.</span><br>Educator by <span>Passion.</span></h2>
        <p>Dr. Kareem Wael Maarouf combines a strong medical and scientific background with years of teaching experience to make Biology and Psychology clear, engaging, and memorable.</p>
        <p>He focuses on understanding rather than memorization, helping students develop confidence, scientific thinking, and stronger exam performance.</p>
        <ul class="credentials"><li>BACHELOR OF DENTAL SURGERY</li><li>EXCELLENCE IN HUMAN BIOLOGY</li><li>BIOLOGY & PSYCHOLOGY EDUCATOR</li></ul>
        <a class="btn primary" href="/achievements/" data-track="meet_dr_kareem">MEET DR. KAREEM</a>
      </div>
    </section>

    <section class="section programs" id="courses">
      <p class="eyebrow gold center">PREMIUM ACADEMIC PROGRAMS</p>
      <h2 class="center">Structured Learning. <span>Stronger Results.</span></h2>
      <div class="program-grid">
        ${programs.map((program) => `<article class="program-card">
          <div class="program-top"><span>${program.label}</span>${program.price ? `<strong>${program.price}</strong>` : ""}</div>
          <h3>${program.title}</h3>
          <p class="meta">${program.meta}</p>
          <p class="date">${program.date}</p>
          <p>${program.body}</p>
          <div class="actions small"><a class="btn secondary" href="/courses/" data-track="view_program_${program.label.toLowerCase()}">VIEW PROGRAM</a><a class="btn primary" href="/contact/" data-track="reserve_${program.label.toLowerCase()}">RESERVE YOUR PLACE</a></div>
        </article>`).join("")}
      </div>
    </section>

    <section class="section method">
      <p class="eyebrow gold">TEACHING METHODOLOGY</p>
      <div class="method-head"><h2>The Marouf Method</h2><p>A clearer path from complex concepts to confident answers.</p></div>
      <div class="step-grid">
        ${steps.map(([number, title, body]) => `<article class="step"><span>${number}</span><h3>${title}</h3><p>${body}</p></article>`).join("")}
      </div>
    </section>

    <section class="section books" id="books">
      <p class="eyebrow gold center">PUBLISHED RESOURCES</p>
      <h2 class="center">Premium Biology & Psychology Resources</h2>
      <p class="subhead">CAMBRIDGE    PEARSON EDEXCEL    AVAILABLE AT ATLAS BOOKSTORE</p>
      <div class="book-grid">
        ${books.map(([image, label, title, body]) => `<article class="book-card"><img src="${image}" alt="${title}"><span>${label}</span><h3>${title}</h3><p>${body}</p><a class="order" href="/contact/" data-track="order_${title.toLowerCase().replaceAll(" ", "_")}">ORDER NOW</a></article>`).join("")}
      </div>
    </section>

    <section class="featured">
      <div class="featured-images"><img src="/marouf-assets/clinic-1.jpg" alt="Biology guide preview"><img src="/marouf-assets/clinic-2.jpg" alt="Biology guide second preview"></div>
      <div>
        <p class="pill">NOW AVAILABLE</p>
        <p class="eyebrow gold">FEATURED BIOLOGY GUIDE</p>
        <h2>A Complete Biology <span>Companion</span></h2>
        <p>A comprehensive Year 10 Biology guide designed with clear explanations, visual summaries, comparison tables, diagrams, and organized syllabus coverage for maximum exam readiness.</p>
        <ul class="ticks"><li>28 organized chapters</li><li>Visual summaries</li><li>Comparison tables</li><li>Clear definitions</li><li>Exam-focused support</li></ul>
      </div>
    </section>

    <section class="section achievements" id="achievements">
      <p class="eyebrow gold center">CREDENTIALS & ACHIEVEMENTS</p>
      <h2 class="center">Academic Excellence <span>Behind Every Lesson</span></h2>
      <div class="achievement-grid">
        ${achievements.map(([title, body]) => `<article><h3>${title}</h3><p>${body}</p></article>`).join("")}
      </div>
      <blockquote>"Biology comes to life when every detail connects,<br> every concept finds meaning, and understanding turns knowledge into mastery."<cite>Dr. Kareem Wael Maarouf <span>FOUNDER - THE MAROUF METHOD</span></cite></blockquote>
    </section>

    <section class="section quizzes" id="quizzes">
      <p class="eyebrow gold center">QUIZZES & PRACTICE</p>
      <h2 class="center">Practice That Feels <span>Exam Ready.</span></h2>
      <div class="program-grid">
        <article class="program-card"><div class="program-top"><span>BIOLOGY</span></div><h3>Biology Topic Checks</h3><p>Short practice sets for core concepts, diagrams, definitions, and structured exam answers.</p><a class="btn secondary" href="/contact/" data-track="quiz_biology">REQUEST ACCESS</a></article>
        <article class="program-card"><div class="program-top"><span>PSYCHOLOGY</span></div><h3>Psychology Question Drills</h3><p>Focused drills for theories, studies, evaluation points, and confident written responses.</p><a class="btn secondary" href="/contact/" data-track="quiz_psychology">REQUEST ACCESS</a></article>
      </div>
    </section>

    <section class="section testimonials" id="testimonials">
      <p class="eyebrow gold">STUDENT EXPERIENCES</p>
      <h2>Learning That <span>Changes Confidence</span></h2>
      <div class="testimonial-grid">
        ${testimonials.map(([body, author]) => `<article><span class="mark">"</span><p>${body}</p><strong>- ${author}</strong></article>`).join("")}
      </div>
      <a class="btn secondary" href="/testimonials/" data-track="read_student_stories">READ MORE STUDENT STORIES</a>
      <div class="parent-note"><span>"</span><p>Thank you for your effort with the students and for making them love the subject.</p><strong>- PARENT FEEDBACK -</strong></div>
    </section>

    <section class="enrollment" id="contact">
      <p class="eyebrow gold center">ENROLLMENT</p>
      <h2>Begin Your <span>Academic Journey</span></h2>
      <p>Reserve your place in The Marouf Method's Biology or Psychology program and build the understanding, confidence, and exam skills needed for lasting success.</p>
      <div class="actions"><a class="btn primary" href="mailto:maroufkareem0@gmail.com" data-track="register_email">REGISTER NOW</a><a class="btn secondary whatsapp" href="https://wa.me/201114626999" data-track="whatsapp">CHAT ON WHATSAPP</a></div>
      <p class="contact-line">- 01114626999    - maroufkareem0@gmail.com</p>
    </section>

    <footer>
      <div><h3>The Marouf Method</h3><p>Premium Biology and<br>Psychology education focused<br>on clear understanding,<br>academic confidence, and<br>exam success.</p></div>
      <div><h4>QUICK LINKS</h4>${navItems.slice(0, 7).map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div>
      <div><h4>PROGRAMS</h4><a href="/courses/">Cambridge Biology O Level</a><a href="/courses/">Psychology O Level</a><a href="/books/">Grade 9 Biology Book</a><a href="/books/">Grade 10 Biology Book</a></div>
      <div><h4>CONTACT</h4><a href="tel:01114626999">01114626999</a><a href="mailto:maroufkareem0@gmail.com">maroufkareem0@gmail.com</a><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">TikTok</a><a href="https://wa.me/201114626999">WhatsApp</a></div>
      <div class="footer-bottom"><span>© The Marouf Method. All rights reserved.</span><span>Where Knowledge Becomes Mastery</span></div>
    </footer>
  </main>
  <script>
    const routeTargets = ${JSON.stringify(routeTargets)};
    const target = routeTargets[window.location.pathname];
    if (target && target !== "home") {
      window.addEventListener("load", () => document.getElementById(target)?.scrollIntoView({ block: "start" }));
    }
    document.addEventListener("click", (event) => {
      const tracked = event.target.closest("[data-track]");
      if (tracked) console.info("track", tracked.dataset.track);
    });
  </script>
</body>
</html>`;
}

export async function writeStaticSite(outputDir, { writeRootIndex = false } = {}) {
  const css = await readFile("app/globals.css", "utf8");
  const html = renderPage(css);
  const pages = ["", "about", "courses", "books", "achievements", "testimonials", "contact", "quizzes"];

  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), html);
  for (const page of pages.filter(Boolean)) {
    const pageDir = join(outputDir, page);
    await mkdir(pageDir, { recursive: true });
    await writeFile(join(pageDir, "index.html"), html);
  }

  if (writeRootIndex) {
    await writeFile("index.html", html);
  }
}

if (process.argv.includes("--write-index")) {
  await writeStaticSite("vercel-output", { writeRootIndex: true });
}
