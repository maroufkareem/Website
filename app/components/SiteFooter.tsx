import Image from "next/image";
import Link from "next/link";

type NavItem = { href: string; label: string };
type Program = { title: string };
type Book = { title: string };
type SocialLinks = { instagram?: string; linkedin?: string; tiktok?: string };

export default function SiteFooter({
  navItems,
  programs,
  books,
  footerBlurb,
  contactPhone,
  contactEmail,
  whatsappHref,
  social,
}: {
  navItems: NavItem[];
  programs: Program[];
  books: Book[];
  footerBlurb: string;
  contactPhone: string;
  contactEmail: string;
  whatsappHref: string;
  social: SocialLinks;
}) {
  return (
    <footer>
      <div>
        <Image
          className="footer-logo"
          src="/marouf-assets/logo.png"
          alt=""
          width={128}
          height={128}
        />
        <h3>The Marouf Method</h3>
        <p>{footerBlurb}</p>
      </div>
      <div>
        <h4>QUICK LINKS</h4>
        {navItems.slice(0, 7).map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </div>
      <div>
        <h4>PROGRAMS</h4>
        {programs.slice(0, 2).map((program) => (
          <Link href="/courses" key={program.title}>
            {program.title}
          </Link>
        ))}
        {books.slice(0, 2).map((book) => (
          <Link href="/books" key={book.title}>
            {book.title}
          </Link>
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
  );
}
