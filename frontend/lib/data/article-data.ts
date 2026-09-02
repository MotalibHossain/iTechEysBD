// ─────────────────────────────────────────────────────────────────────────────
// Article mock data — replace with API / CMS calls when backend is ready.
// ─────────────────────────────────────────────────────────────────────────────

export interface ArticleReply {
  id: string;
  name: string;
  avatar: string;
  time: string;
  body: string;
}

export interface ArticleComment {
  id: string;
  name: string;
  avatar: string;
  time: string;
  likes: number;
  body: string;
  replies: ArticleReply[];
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  author: { name: string; role: string; bio: string; avatar: string };
  date: string;
  readTime: string;
  heroImage: string;
  heroCaption: string;
  tags: string[];
  toc: { id: string; label: string }[];
  bullets: { title: string; desc: string }[];
  gallery: { src: string; alt: string }[];
  popularPosts: { num: string; title: string; views: string; slug: string }[];
  related: { category: string; date: string; read: string; title: string; slug: string; image: string }[];
  comments: ArticleComment[];
}

export const articleData: Article = {
  slug: "dollar-crisis-ramadan-commodity-shortage",
  category: "Economy",
  title: "ডলার সংকটে রমজানে ভোগ্যপণ্যের সংকটের আশঙ্কা",
  subtitle:
    "Exporters and economists weigh in on what a tightening foreign-currency reserve means for everyday consumers in the months ahead.",
  author: {
    name: "Motalib Rahman",
    role: "Senior Economy Writer",
    bio: "Covers macroeconomics and trade for iTechEys. Writes in both বাংলা and English.",
    avatar: "https://picsum.photos/seed/author-motalib/100/100",
  },
  date: "Jun 25, 2026",
  readTime: "9 min read",
  heroImage: "https://picsum.photos/seed/article-hero/1200/600",
  heroCaption:
    "A wholesale market in Old Dhaka, where importers say tighter dollar supply is already reshaping prices. — iTechEys",
  tags: ["Economy", "DollarCrisis", "Ramadan", "Imports", "Bangladesh"],
  toc: [
    { id: "sec1", label: "আমদানি কমায় কী প্রভাব পড়ছে" },
    { id: "sec2", label: "How analysts model the risk" },
  ],
  bullets: [
    { title: "Edible oil", desc: "largely imported; among the most exposed to LC constraints." },
    { title: "Sugar & dates", desc: "seasonal Ramadan demand collides with tighter supply." },
    { title: "Pulses (ডাল)", desc: "price-sensitive staple where small shifts hit households hard." },
    { title: "Spices", desc: "import-heavy category facing freight and currency pressure." },
  ],
  gallery: [
    { src: "https://picsum.photos/seed/gal-staples/400/400", alt: "Wholesale staples in central Dhaka" },
    { src: "https://picsum.photos/seed/gal-exchange/400/400", alt: "Currency-exchange counter in central Dhaka" },
  ],
  popularPosts: [
    { num: "01", title: "আইএমএফ-এর ঋণ এলে ডলার সংকট কাটবে?", views: "18.2k", slug: "imf-loan-dollar-crisis-solution" },
    { num: "02", title: "Dhaka's fintech founders raise a record quarter", views: "12.7k", slug: "dhaka-fintech-founders-record-quarter" },
    { num: "03", title: "স্মার্টফোন বাজারে স্থানীয় ব্র্যান্ডের উত্থান", views: "9.4k", slug: "smartphone-local-brands-rise" },
    { num: "04", title: "Self-hosting in 2026: the quiet comeback", views: "7.1k", slug: "self-hosting-2026" },
  ],
  related: [
    {
      category: "Economy",
      date: "Jun 24",
      read: "6 min",
      title: "রেমিট্যান্স বাড়লেও স্বস্তি নেই বাজারে",
      slug: "remittance-up-no-relief",
      image: "https://picsum.photos/seed/rel-1/400/220",
    },
    {
      category: "Markets",
      date: "Jun 22",
      read: "8 min",
      title: "What a weaker taka means for small importers",
      slug: "weaker-taka-importers",
      image: "https://picsum.photos/seed/rel-2/400/220",
    },
    {
      category: "Policy",
      date: "Jun 19",
      read: "5 min",
      title: "বাজেটে ভোগ্যপণ্যে শুল্ক ছাড়ের সম্ভাবনা",
      slug: "budget-duty-exemption",
      image: "https://picsum.photos/seed/rel-3/400/220",
    },
  ],
  comments: [
    {
      id: "c1",
      name: "Sadia Karim",
      avatar: "https://picsum.photos/seed/user-sadia/80/80",
      time: "2h ago",
      likes: 24,
      body: "চমৎকার বিশ্লেষণ। আমদানি নির্ভরতা কমানোই দীর্ঘমেয়াদে আসল সমাধান।",
      replies: [
        {
          id: "r1",
          name: "Motalib Rahman",
          avatar: "https://picsum.photos/seed/author-motalib/80/80",
          time: "1h ago",
          body: "একমত। তবে স্বল্পমেয়াদে রিজার্ভ ম্যানেজমেন্টই মুখ্য।",
        },
      ],
    },
    {
      id: "c2",
      name: "Imran Sutradhar",
      avatar: "https://picsum.photos/seed/user-imran/80/80",
      time: "5h ago",
      likes: 11,
      body: "The reserve-index snippet is a neat way to frame it. Would love a follow-up with live data.",
      replies: [],
    },
  ],
};
