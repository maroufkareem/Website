import type { MetadataRoute } from "next";

const BASE_URL = "https://www.drkareemmarouf.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/courses", priority: 0.9 },
    { path: "/books", priority: 0.9 },
    { path: "/achievements", priority: 0.6 },
    { path: "/testimonials", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/quizzes", priority: 0.5 },
    { path: "/enroll", priority: 0.7 },
    { path: "/reserve", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    priority,
  }));
}
