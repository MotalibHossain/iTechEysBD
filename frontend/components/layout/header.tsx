"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Plus, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "হোম", href: "/" },
  { label: "থিম ডাউনলোড", href: "/theme" },
  { label: "সার্ভিস সমূহ", href: "/service" },
  { label: "যোগাযোগ", href: "/contact" },
  { label: "সব ক্যাটেগরি", href: "/category" },
];

// Reusable style presets — change once, applies to every icon button in header.
const iconBtn =
  "w-10 h-10 rounded-btn border border-line-2 bg-surface flex items-center justify-center text-ink-2 " +
  "transition-colors duration-200 hover:border-ink hover:text-ink cursor-pointer";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/88 backdrop-saturate-180 backdrop-blur-[14px] border-b border-line-2">
      <div className="container h-18 flex items-center gap-4 lg:gap-7.5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.75 no-underline text-ink">
          <span className="w-8.5 h-8.5 rounded-input bg-brand flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(230,57,70,0.7)]">
            <span className="w-3.25 h-3.25 rounded-sm bg-white rotate-45 block" />
          </span>
          <span className="font-bold text-[23px] tracking-[-0.4px] font-newsreader">
            iTech<span className="text-brand">Eys</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 ml-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[14.5px] px-3.25 py-2.25 rounded-[9px] flex flex-col items-center transition-colors duration-200 hover:bg-surface-warm-strong",
                  isActive ? "text-ink font-bold" : "text-ink-2 font-medium"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-px left-3.25 right-3.25 h-0.5 rounded-sm bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2.5">
          <button aria-label="Search" className={iconBtn}>
            <Search size={18} strokeWidth={2.1} />
          </button>

          <Link
            href="/save-post"
            className="hidden md:inline-flex items-center gap-1.75 h-10 px-4 rounded-btn bg-ink text-white text-[13.5px] font-bold no-underline transition-colors duration-200 hover:bg-brand"
          >
            <Plus size={15} strokeWidth={2.2} />
            পোস্ট করুন
          </Link>

          <button aria-label="Account" className={iconBtn}>
            <User size={19} strokeWidth={2.1} />
          </button>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 rounded-btn border border-line-2 bg-surface flex items-center justify-center text-ink cursor-pointer"
          >
            {menuOpen ? <X size={20} strokeWidth={2.1} /> : <Menu size={20} strokeWidth={2.1} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-line-2 bg-surface px-5 pt-2.5 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block text-base font-medium py-3 px-1.5 border-b border-line-4 no-underline transition-colors",
                pathname === item.href ? "text-brand font-semibold" : "text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/save-post"
            onClick={() => setMenuOpen(false)}
            className="block text-center no-underline bg-ink text-white text-[15px] font-bold py-3.25 rounded-btn mt-3.5 hover:bg-brand transition-colors duration-200"
          >
            পোস্ট করুন
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;