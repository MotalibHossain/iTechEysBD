// ─────────────────────────────────────────────────────────────────────────────
// Home page — assembles all home sections in order.
// Layout note:
//   • Most sections sit inside the 1240px centred container.
//   • NewsletterSection is intentionally full-width (no container wrapping).
// ─────────────────────────────────────────────────────────────────────────────

import HeroSection from "@/components/home/HeroSection";
import LatestTicker from "@/components/home/LatestTicker";
import LatestStoriesSection from "@/components/home/LatestStoriesSection";
import EditorsPicksSection from "@/components/home/EditorsPicksSection";
import MostReadSection from "@/components/home/MostReadSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import RecommendedSection from "@/components/home/RecommendedSection";

export default function HomePage() {
  return (
    <main>
      {/* ── Sections inside centred container ─────────────────────────────── */}
      <div className="px-7 pt-7.5">
        <HeroSection />
        <LatestTicker />
        <LatestStoriesSection />
        <EditorsPicksSection />
        <MostReadSection />
        <NewsletterSection />
      </div>

      {/* ── Newsletter: spans full viewport width ──────────────────────────── */}

      {/* ── Recommended: back inside the centred container ─────────────────── */}
      <div className="px-7">
        <RecommendedSection />
      </div>
    </main>
  );
}

