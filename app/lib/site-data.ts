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

// Shared by every route (homepage + the dedicated /about, /courses, etc.
// pages) so each page fetches and falls back the same way instead of
// repeating this logic.
export async function getSiteData() {
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

  return {
    settings,
    programs: programsRows.length > 0 ? programsRows : DEFAULT_PROGRAMS,
    books: booksRows.length > 0 ? booksRows : DEFAULT_BOOKS,
    achievements: achievementsRows.length > 0 ? achievementsRows : DEFAULT_ACHIEVEMENTS,
    testimonials: testimonialsRows.length > 0 ? testimonialsRows : DEFAULT_TESTIMONIALS,
    navItems: navRows.length > 0 ? navRows : DEFAULT_NAV_ITEMS,
    stats: settings.stats?.length ? settings.stats : DEFAULT_SITE_SETTINGS.stats,
    methodSteps: settings.methodSteps?.length ? settings.methodSteps : DEFAULT_SITE_SETTINGS.methodSteps,
    aboutCredentials: settings.aboutCredentials?.length
      ? settings.aboutCredentials
      : DEFAULT_SITE_SETTINGS.aboutCredentials,
    heroBadges: settings.heroBadges?.length ? settings.heroBadges : DEFAULT_SITE_SETTINGS.heroBadges,
    featuredChecklist: settings.featuredChecklist?.length
      ? settings.featuredChecklist
      : DEFAULT_SITE_SETTINGS.featuredChecklist,
    social: { ...DEFAULT_SITE_SETTINGS.socialLinks, ...(settings.socialLinks ?? {}) },
    whatsappHref: settings.contactWhatsapp || DEFAULT_SITE_SETTINGS.contactWhatsapp,
    contactEmail: settings.contactEmail || DEFAULT_SITE_SETTINGS.contactEmail,
    contactPhone: settings.contactPhone || DEFAULT_SITE_SETTINGS.contactPhone,
  };
}

export type SiteData = Awaited<ReturnType<typeof getSiteData>>;
