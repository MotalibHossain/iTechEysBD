// ─────────────────────────────────────────────────────────────────────────────
// Home page. Layout rules:
//   • `container` = one place that controls max-width & horizontal gutter.
//   • `flex-col gap-*` on <main> is the single source of vertical rhythm.
//     Change the gap here and every section spacing on the homepage updates.
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
    <main className="container mx-auto py-8 flex flex-col gap-12">
      <HeroSection />
      <LatestTicker />
      <LatestStoriesSection />
      <EditorsPicksSection />
      <MostReadSection />
      <NewsletterSection />
      <RecommendedSection />
    </main>
  );
}

