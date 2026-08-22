import Link from "next/link";
import MobileNav from "@/app/components/MobileNav";

type NavItem = { href: string; label: string };

export default function SiteHeader({ navItems }: { navItems: NavItem[] }) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="The Marouf Method home">
        <span className="brand-mark">
          <span className="brand-mark-script">Kareem</span>
          <span className="brand-mark-caption">MAROUF</span>
        </span>
        <span>
          <strong>The Marouf Method</strong>
          <small>WHERE KNOWLEDGE BECOMES MASTERY</small>
        </span>
      </Link>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/contact">REGISTER NOW</Link>
      <MobileNav navItems={navItems} />
    </header>
  );
}
