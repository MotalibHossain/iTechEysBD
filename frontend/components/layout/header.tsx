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

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/[0.88] backdrop-saturate-[180%] backdrop-blur-[14px] border-b border-[#EAE8E2]">
      <div className="container mx-auto px-4 md:px-7 h-[72px] flex items-center gap-4 lg:gap-[30px]">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-[11px] no-underline text-[#16151A]"
        >
          <span className="w-[34px] h-[34px] rounded-[10px] bg-[#E63946] flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(230,57,70,0.7)]">
            <span className="w-[13px] h-[13px] rounded-[4px] bg-white rotate-45 block" />
          </span>
          <span
            className="font-bold text-[23px] tracking-[-0.4px] font-newsreader"
          >
            iTech<span className="text-[#E63946]">Eys</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5 ml-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[14.5px] px-[13px] py-[9px] rounded-[9px] flex flex-col items-center transition-colors duration-200 hover:bg-[#F1EFE9]",
                  isActive
                    ? "text-[#16151A] font-bold"
                    : "text-[#57565C] font-medium"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-[-1px] left-[13px] right-[13px] h-0.5 rounded-sm bg-[#E63946]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2.5">

          {/* Search */}
          <button
            aria-label="Search"
            className="w-10 h-10 rounded-[11px] border border-[#EAE8E2] bg-white flex items-center justify-center text-[#57565C] transition-colors duration-200 hover:border-[#16151A] hover:text-[#16151A] cursor-pointer"
          >
            <Search size={18} strokeWidth={2.1} />
          </button>

          {/* পোস্ট করুন — desktop only */}
          <Link
            href="/save-post"
            className="hidden md:inline-flex items-center gap-[7px] h-10 px-4 rounded-[11px] bg-[#16151A] text-white text-[13.5px] font-bold no-underline transition-colors duration-200 hover:bg-[#E63946]"
          >
            <Plus size={15} strokeWidth={2.2} />
            পোস্ট করুন
          </Link>

          {/* Account */}
          <button
            aria-label="Account"
            className="w-10 h-10 rounded-[11px] border border-[#EAE8E2] bg-white flex items-center justify-center text-[#57565C] transition-colors duration-200 hover:border-[#16151A] hover:text-[#16151A] cursor-pointer"
          >
            <User size={19} strokeWidth={2.1} />
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 rounded-[11px] border border-[#EAE8E2] bg-white flex items-center justify-center text-[#16151A] cursor-pointer"
          >
            {menuOpen ? (
              <X size={20} strokeWidth={2.1} />
            ) : (
              <Menu size={20} strokeWidth={2.1} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#EAE8E2] bg-white px-5 pt-2.5 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block text-base font-medium py-3 px-1.5 border-b border-[#F1EFE9] no-underline transition-colors",
                pathname === item.href
                  ? "text-[#E63946] font-semibold"
                  : "text-[#16151A]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/save-post"
            onClick={() => setMenuOpen(false)}
            className="block text-center no-underline bg-[#16151A] text-white text-[15px] font-bold py-[13px] rounded-[11px] mt-3.5 hover:bg-[#E63946] transition-colors duration-200"
          >
            পোস্ট করুন
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;