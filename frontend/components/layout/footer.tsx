import Link from "next/link";

const socials = [
  { label: "FB", href: "#" },
  { label: "TW", href: "#" },
  { label: "YT", href: "#" },
  { label: "IN", href: "#" },
];

const footerCols = [
  {
    head: "Explore",
    items: [
      { label: "হোম", href: "/" },
      { label: "থিম ডাউনলোড", href: "/theme" },
      { label: "সার্ভিস সমূহ", href: "/service" },
      { label: "সব ক্যাটেগরি", href: "/category" },
    ],
  },
  {
    head: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "যোগাযোগ", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    head: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#16151A] text-[#C9C7CE] font-sans">
      <div className="container mx-auto px-4 md:px-7 pt-14 pb-[30px]">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-[38px]">

          {/* Brand column */}
          <div className="max-w-[300px]">
            <Link href="/" className="flex items-center gap-[11px] text-white no-underline">
              <span className="w-[34px] h-[34px] rounded-[10px] bg-[#E63946] flex items-center justify-center">
                <span className="w-[13px] h-[13px] rounded-[4px] bg-white rotate-45 block" />
              </span>
              <span
                className="font-bold text-[22px] tracking-[-0.4px] font-newsreader"
              >
                iTech<span className="text-[#E63946]">Eys</span>
              </span>
            </Link>
            <p className="text-sm leading-[1.65] text-[#8E8D94] mt-4">
              A modern publication on technology, design and culture — thoughtfully written in English and বাংলা.
            </p>
            <div className="flex gap-2.5 mt-5">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-[38px] h-[38px] rounded-[10px] border border-[#2E2C34] bg-[#1E1D23] flex items-center justify-center text-[#C9C7CE] text-[13px] font-bold no-underline transition-colors duration-200 hover:bg-[#E63946] hover:text-white hover:border-[#E63946]"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.head}>
              <h4 className="text-[13px] font-bold tracking-[0.8px] uppercase text-white mb-4">
                {col.head}
              </h4>
              <div className="flex flex-col gap-[11px]">
                {col.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-[#8E8D94] no-underline transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 mt-11 pt-[22px] border-t border-[#2E2C34] text-[13px] text-[#6E6D75]">
          <span>© {year} iTechEys. All rights reserved.</span>
          <span className="flex gap-5">
            <Link href="/privacy" className="text-[#6E6D75] no-underline hover:text-white transition-colors duration-200">Privacy</Link>
            <Link href="/terms" className="text-[#6E6D75] no-underline hover:text-white transition-colors duration-200">Terms</Link>
            <Link href="/sitemap" className="text-[#6E6D75] no-underline hover:text-white transition-colors duration-200">Sitemap</Link>
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;