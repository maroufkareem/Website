// Fallback content mirrors the original hardcoded page so the public site
// never breaks/crashes if the database is empty or temporarily unreachable.
import type { SiteStat, MethodStep } from "@/db/schema";

export const DEFAULT_NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Books", href: "/books" },
  { label: "Achievements", href: "/achievements" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "Quizzes", href: "/quizzes" },
];

export const DEFAULT_STATS: SiteStat[] = [
  { number: "5+", label: "YEARS OF TEACHING", sub: "EXPERIENCE" },
  { number: "3", label: "PUBLISHED BIOLOGY", sub: "BOOKS" },
  { number: "10-12", label: "ACADEMIC PROGRAM", sub: "GRADES" },
  { number: "Bio & Psych", label: "SPECIALIZED SUBJECTS", sub: "" },
];

export const DEFAULT_PROGRAMS = [
  {
    id: -1,
    label: "BIOLOGY",
    title: "Cambridge Biology O Level",
    price: "$400",
    meta: "GRADES 10, 11 & 12    ONLINE - 8-MONTH PROGRAM",
    date: "1 OCTOBER - 1 MAY",
    body: "A complete Cambridge Biology program designed to simplify difficult concepts, strengthen scientific understanding, and improve exam-answering skills.",
    sortOrder: 0,
    published: true,
  },
  {
    id: -2,
    label: "PSYCHOLOGY",
    title: "Cambridge Psychology O Level",
    price: "$400",
    meta: "GRADES 10, 11 & 12    ONLINE - 8-MONTH PROGRAM",
    date: "1 OCTOBER - 1 MAY",
    body: "A complete Psychology program designed to simplify key theories, strengthen analytical thinking, and improve structured exam-answering skills.",
    sortOrder: 1,
    published: true,
  },
];

export const DEFAULT_METHOD_STEPS: MethodStep[] = [
  { number: "01", title: "Understand", body: "Complex topics are broken down into clear, logical explanations that make sense on first encounter." },
  { number: "02", title: "Connect", body: "Scientific concepts are connected to real examples and visual learning for deeper retention." },
  { number: "03", title: "Practice", body: "Students apply what they learn through structured questions and guided revision sessions." },
  { number: "04", title: "Master", body: "Students build confidence, accuracy, and strong exam technique for lasting academic success." },
];

export const DEFAULT_BOOKS = [
  { id: -1, imageUrl: "/marouf-assets/book-9.jpg", label: "Grade 9 - Cambridge", title: "Biology Core - Grade 9", body: "A clear, structured guide that simplifies core Biology concepts and supports confident learning throughout the year.", sortOrder: 0, published: true },
  { id: -2, imageUrl: "/marouf-assets/book-10.jpg", label: "Grade 10 - O Level", title: "Biology O Level - Grade 10", body: "A complete Biology guide with clear explanations, diagrams, revision support, and exam-focused practice.", sortOrder: 1, published: true },
  { id: -3, imageUrl: "/marouf-assets/book-capsule-cover.jpg", label: "IGCSE BIOLOGY - REVISION GUIDE", title: "Marouf's Bio Capsule", body: "A focused revision guide that simplifies key Biology topics and strengthens exam preparation.", sortOrder: 2, published: true },
  { id: -4, imageUrl: "/marouf-assets/book-psych.jpg", label: "IGCSE - PSYCHOLOGY O LEVEL", title: "Psychology O Level", body: "A structured Psychology guide covering key concepts, clear explanations, and exam-focused learning.", sortOrder: 3, published: true },
];

export const DEFAULT_ACHIEVEMENTS = [
  { id: -1, title: "Human Biology Excellence", body: "Completed Human Biology with an excellent grade in the Faculty of Oral and Dental Medicine.", sortOrder: 0, published: true },
  { id: -2, title: "Bachelor of Dental Surgery", body: "Strong medical and scientific academic background from Future University in Egypt.", sortOrder: 1, published: true },
  { id: -3, title: "IGCSE Graduate", body: "Successfully completed the IGCSE requirements at Sahara International School.", sortOrder: 2, published: true },
  { id: -4, title: "Published Educational Resources", body: "Author of Biology Core Grade 9, Biology O Level Year 10, Marouf's Bio Capsule, and Psychology O Level Year 10 educational resources.", sortOrder: 3, published: true },
];

export const DEFAULT_TESTIMONIALS = [
  { id: -1, body: "Biology used to be the subject I disliked most because I could not understand it. Now I genuinely look forward to every Biology session.", author: "BIOLOGY STUDENT", sortOrder: 0, published: true },
  { id: -2, body: "Everything Dr. Kareem told us to focus on appeared in the exam, and the exam felt much easier than expected.", author: "O LEVEL BIOLOGY STUDENT", sortOrder: 1, published: true },
  { id: -3, body: "Thank you for making Biology clearer, easier, and more enjoyable throughout the year. Your support made a real difference.", author: "GRADE 10 STUDENT", sortOrder: 2, published: true },
];

export const DEFAULT_SITE_SETTINGS = {
  heroEyebrow: "CAMBRIDGE BIOLOGY & PSYCHOLOGY EDUCATION",
  heroDoctorName: "DR. KAREEM WAEL MAAROUF",
  heroDoctorRole: "Dentist by Profession.",
  heroHeadline: "Where Knowledge Becomes Mastery",
  heroCopy:
    "Learn Biology and Psychology through clear explanations, premium academic resources, and exam-focused guidance by Dr. Kareem Wael Maarouf.",
  heroQuote: '"Understand More. Memorize Less."',
  heroBadges: ["GRADES 10-12", "ONLINE PROGRAMS", "CAMBRIDGE & O LEVEL"],
  heroImageUrl: "/marouf-assets/hero.jpg",
  stats: DEFAULT_STATS,

  aboutEyebrow: "ABOUT DR. KAREEM",
  aboutHeading: "Dentist by Profession. Educator by Passion.",
  aboutParagraph1:
    "Dr. Kareem Wael Maarouf combines a strong medical and scientific background with years of teaching experience to make Biology and Psychology clear, engaging, and memorable.",
  aboutParagraph2:
    "He focuses on understanding rather than memorization, helping students develop confidence, scientific thinking, and stronger exam performance.",
  aboutCredentials: ["BACHELOR OF DENTAL SURGERY", "EXCELLENCE IN HUMAN BIOLOGY", "BIOLOGY & PSYCHOLOGY EDUCATOR"],
  aboutPortraitUrl: "/marouf-assets/doctor-portrait.jpeg",

  methodSteps: DEFAULT_METHOD_STEPS,

  featuredEyebrow: "FEATURED BIOLOGY GUIDE",
  featuredHeading: "A Complete Biology Companion",
  featuredBody:
    "A comprehensive Year 10 Biology guide designed with clear explanations, visual summaries, comparison tables, diagrams, and organized syllabus coverage for maximum exam readiness.",
  featuredChecklist: ["28 organized chapters", "Visual summaries", "Comparison tables", "Clear definitions", "Exam-focused support"],
  featuredImage1Url: "/marouf-assets/book-capsule-cover.jpg",
  featuredImage2Url: "/marouf-assets/book-capsule-cover.jpg",

  contactEmail: "maroufkareem0@gmail.com",
  contactPhone: "01114626999",
  contactWhatsapp: "https://wa.me/201114626999",
  socialLinks: {
    instagram: "https://www.instagram.com/themaroufmethod",
    linkedin: "#",
    tiktok: "https://www.tiktok.com/@themaroufmethod",
    whatsapp: "https://wa.me/201114626999",
  },

  footerBlurb:
    "Premium Biology and Psychology education focused on clear understanding, academic confidence, and exam success.",
};
