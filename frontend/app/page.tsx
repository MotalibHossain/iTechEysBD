// ─────────────────────────────────────────────────────────────────────────────
// Home page — assembles all home sections in order.
// Layout note:
//   • Most sections sit inside the 1280px centred container.
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
      <div className="page-shell pt-8 md:pt-10">
        <div className="section-stack">
          <HeroSection />
          <LatestTicker />
          <LatestStoriesSection />
          <EditorsPicksSection />
          <MostReadSection />
        </div>
      </div>

      <NewsletterSection />

      <div className="page-shell">
        <RecommendedSection />
      </div>
    </main>
  );
}

