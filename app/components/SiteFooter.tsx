import Image from "next/image";
import Link from "next/link";

type NavItem = { href: string; label: string };
type Program = { title: string };
type Book = { title: string };
type SocialLinks = { instagram?: string; linkedin?: string; tiktok?: string };

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.6.5.7.3 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.2.6.4 1.4.5 2.6.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.6-.3.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.6.2-1.4.4-2.6.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.6-.5-.7-.3-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.2-.6-.4-1.4-.5-2.6C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-2 .5-2.6.3-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.6-.2 1.4-.4 2.6-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.4-.3 1-.4 2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.1 1 .3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.4.3-1 .4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.1-1-.3-2-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5.7-2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 20.4H3.6V9H7v11.4Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 2h-3.3v13.6a2.8 2.8 0 1 1-2-2.7v-3.4a6.2 6.2 0 1 0 5.3 6.1V8.6a8.3 8.3 0 0 0 4.7 1.5V6.8a5 5 0 0 1-4.7-4.8Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 14.5c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  );
}

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
        <div className="social-icons">
          <a href={social.instagram || "#"} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
          <a href={social.linkedin || "#"} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
          <a href={social.tiktok || "#"} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
            <TikTokIcon />
          </a>
          <a href={whatsappHref} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© The Marouf Method. All rights reserved.</span>
        <span>Where Knowledge Becomes Mastery</span>
      </div>
    </footer>
  );
}
