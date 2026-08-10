// ─────────────────────────────────────────────────────────────────────────────
// Home page mock data
// Replace with real API calls when the backend is ready.
// ─────────────────────────────────────────────────────────────────────────────

// ── Hero carousel slides ──────────────────────────────────────────────────────
export const heroSlides = [
  {
    id: "hero1",
    image: "https://picsum.photos/seed/hero1/900/520",
    category: "Economy",
    author: "Motalib Rahman",
    date: "Jun 27, 2026",
    read: "9 min read",
    title: "ডলার সংকটে রমজানে ভোগ্যপণ্যের সংকটের আশঙ্কা",
  },
  {
    id: "hero2",
    image: "https://picsum.photos/seed/hero2/900/520",
    category: "Technology",
    author: "Sadia Karim",
    date: "Jun 26, 2026",
    read: "8 min read",
    title: "The 2026 frontend survey: what teams are actually shipping",
  },
  {
    id: "hero3",
    image: "https://picsum.photos/seed/hero3/900/520",
    category: "AI",
    author: "Tanvir Ahmed",
    date: "Jun 25, 2026",
    read: "6 min read",
    title: "নতুন এআই মডেল বদলে দিচ্ছে বাংলা ভাষার প্রযুক্তি",
  },
];

// ── Trending sidebar items ────────────────────────────────────────────────────
export const trendingItems = [
  { id: "t1", num: "1", category: "Technology", title: "আইএমএফ-এর ঋণ এলে ডলার সংকট কাটবে?",         image: "https://picsum.photos/seed/t1/120/80" },
  { id: "t2", num: "2", category: "Startups",   title: "Dhaka's fintech founders raise a record quarter", image: "https://picsum.photos/seed/t2/120/80" },
  { id: "t3", num: "3", category: "Science",    title: "Mapping the Bay of Bengal's deep currents",  image: "https://picsum.photos/seed/t3/120/80" },
  { id: "t4", num: "4", category: "AI",         title: "নতুন এআই মডেল বদলে দিচ্ছে বাংলা প্রযুক্তি",   image: "https://picsum.photos/seed/t4/120/80" },
  { id: "t5", num: "5", category: "Design",     title: "Designing for calm: slower interfaces",      image: "https://picsum.photos/seed/t5/120/80" },
];

// ── Latest ticker headlines ───────────────────────────────────────────────────
// Duplicated to create a seamless infinite loop (CSS animation scrolls 50%)
export const tickerItems = [
  "রপ্তানি আয় ও রেমিট্যান্স সামান্য বেড়েছে — তবে আমদানি কমেছে",
  "Apple ships its first foldable to Asian markets",
  "ঢাকায় শুরু হচ্ছে দেশের বৃহত্তম টেক কনফারেন্স",
  "Open-source Bangla LLM crosses 2M downloads",
  "নতুন বিদ্যুৎ ও গ্যাসের দাম কার্যকর আগামী মাসে",
  "Designers rethink the feed: slower, calmer, deliberate",
];

// ── Latest stories (2×2 grid) ─────────────────────────────────────────────────
export const latestStories = [
  {
    id: "g1",
    image: "https://picsum.photos/seed/g1/560/340",
    avatar: "https://picsum.photos/seed/ga1/60/60",
    category: "Economy",
    author: "Motalib Rahman",
    date: "Jun 24, 2026",
    read: "6 min read",
    title: "ডলার সংকটে রমজানে ভোগ্যপণ্যের সংকটের আশঙ্কা",
    excerpt: "রপ্তানি আয় ও রেমিট্যান্স সামান্য বাড়লেও আমদানি কমায় বাজারে চাপ পড়ছে।",
  },
  {
    id: "g2",
    image: "https://picsum.photos/seed/g2/560/340",
    avatar: "https://picsum.photos/seed/ga2/60/60",
    category: "Technology",
    author: "Sadia Karim",
    date: "Jun 23, 2026",
    read: "8 min read",
    title: "The 2026 frontend survey: what teams are shipping",
    excerpt: "Server components went mainstream and the framework wars cooled. Here's the data.",
  },
  {
    id: "g3",
    image: "https://picsum.photos/seed/g3/560/340",
    avatar: "https://picsum.photos/seed/ga3/60/60",
    category: "AI",
    author: "Tanvir Ahmed",
    date: "Jun 22, 2026",
    read: "5 min read",
    title: "নতুন এআই মডেল বদলে দিচ্ছে বাংলা ভাষার প্রযুক্তি",
    excerpt: "বাংলা টেক্সট জেনারেশন ও অনুবাদে নাটকীয় উন্নতি — নতুন সম্ভাবনার দুয়ার খুলছে।",
  },
  {
    id: "g4",
    image: "https://picsum.photos/seed/g4/560/340",
    avatar: "https://picsum.photos/seed/ga4/60/60",
    category: "Design",
    author: "Nabila Hasan",
    date: "Jun 21, 2026",
    read: "4 min read",
    title: "Designing for calm: the case for slower interfaces",
    excerpt: "Not every product needs another notification. Restraint as a competitive feature.",
  },
];

// ── Sidebar: popular categories ───────────────────────────────────────────────
export const popularCategories = [
  { id: "c1", glyph: "৳",  name: "Economy",    count: "128", bg: "#FCE4E6", fg: "#C71F2E" },
  { id: "c2", glyph: "T",  name: "Technology", count: "312", bg: "#E0EEF0", fg: "#2E7B86" },
  { id: "c3", glyph: "AI", name: "AI & ML",    count: "94",  bg: "#EDE6F6", fg: "#6B43B5" },
  { id: "c4", glyph: "D",  name: "Design",     count: "156", bg: "#E7EFE3", fg: "#3F7D4E" },
  { id: "c5", glyph: "S",  name: "Science",    count: "63",  bg: "#E3E8F3", fg: "#3B5BA5" },
];

// ── Sidebar: trending tags ────────────────────────────────────────────────────
export const trendingTags = [
  "Bangladesh", "AI", "Startups", "WebDev", "Economy",
  "OpenSource", "Design", "Mobile", "Culture", "DevOps",
];

// ── Editor's Picks: cover story ───────────────────────────────────────────────
export const editorFeature = {
  image: "https://picsum.photos/seed/mos1/700/500",
  author: "Motalib Rahman",
  date: "Jun 20, 2026",
  read: "11 min read",
  title: "ডলার সংকটে রমজানে ভোগ্যপণ্যের সংকটের আশঙ্কা",
  excerpt: "তারা বলছেন, রপ্তানি আয় ও রেমিট্যান্স সামান্য বেড়েছে — কিন্তু আমদানি কমায় উৎপাদন কমছে।",
};

// ── Editor's Picks: top-right image card ─────────────────────────────────────
export const editorPickTop = {
  image: "https://picsum.photos/seed/mos2/300/200",
  category: "Technology",
  title: "The 2026 frontend survey highlights",
};

// ── Editor's Picks: accent gradient card ─────────────────────────────────────
export const editorPickAccent = {
  category: "Profile",
  read: "5 min",
  title: "ডলার সংকটে নতুন কৌশল খুঁজছেন ব্যবসায়ীরা",
};

// ── Editor's Picks: bottom row cards ─────────────────────────────────────────
export const editorPicksRow = [
  { id: "epr1", image: "https://picsum.photos/seed/epr1/150/150", category: "Health",   read: "4 min", title: "The four-day week experiments quietly working" },
  { id: "epr2", image: "https://picsum.photos/seed/epr2/150/150", category: "Travel",   read: "7 min", title: "Sylhet's tea trails, slowly rediscovered" },
  { id: "epr3", image: "https://picsum.photos/seed/epr3/150/150", category: "Science",  read: "6 min", title: "সিলেটের চা-বাগানে ফিরছে পর্যটক" },
];

// ── Editor's Picks: tabbed list content ──────────────────────────────────────
export const editorTabs = {
  labels: ["নতুন", "হট", "অন্যান্য"],
  lists: [
    [
      "পুলিশ বোধ হয় মানুষ নয়, এই পৃথিবীর বাইরের ভিন্ন কোন গ্রহের প্রাণী!",
      "এক দিনের জন্য Facebook বন্ধ হলে কি কি ঘটতে পারে?",
      "ই-মেইল ব্যবহারে বড় বিপর্যয় প্রোগ্রামিং ত্রুটির কারণে",
      "কম্পিউটার থেকে অ্যান্ড্রয়েড ফোনে ছবি ও ফাইল পাঠাবেন যেভাবে",
      "উইন্ডোজের যে দুটি সংস্করণ সমর্থন করবে না গুগল ড্রাইভ",
      "ফ্রিল্যান্সিং হলো স্বাধীন বা মুক্তপেশা — শুরু করবেন যেভাবে",
    ],
    [
      "Apple ships its first foldable to Asian markets",
      "Self-hosting in 2026: the quiet comeback",
      "Open-source Bangla LLM crosses 2M downloads",
      "Why long-form writing is winning again online",
      "Dhaka's fintech founders raise a record quarter",
      "Designing for calm: the case for slower interfaces",
    ],
    [
      "সিলেটের চা-বাগানে ধীরে ধীরে ফিরছে পর্যটক",
      "The four-day week experiments quietly working",
      "বাজেটে ভোগ্যপণ্যে শুল্ক ছাড়ের সম্ভাবনা",
      "The race to map the Bay of Bengal's deep currents",
      "স্মার্টফোন বাজারে স্থানীয় ব্র্যান্ডের উত্থান",
      "রেমিট্যান্স বাড়লেও স্বস্তি নেই বাজারে",
    ],
  ],
};

// ── Most Read this week ───────────────────────────────────────────────────────
// numClass — Tailwind text-color class used directly in the component (avoids inline style)
export const mostReadItems = [
  { id: "mr1", num: "1", numClass: "text-[#E63946]", image: "https://picsum.photos/seed/mr1/130/130", category: "Economy",    views: "18.2k", read: "6 min", title: "আইএমএফ-এর ঋণ এলে ডলার সংকট কাটবে?" },
  { id: "mr2", num: "2", numClass: "text-[#E63946]", image: "https://picsum.photos/seed/mr2/130/130", category: "Startups",   views: "12.7k", read: "5 min", title: "Dhaka's fintech founders raise a record quarter" },
  { id: "mr3", num: "3", numClass: "text-[#E63946]", image: "https://picsum.photos/seed/mr3/130/130", category: "Mobile",     views: "9.4k",  read: "7 min", title: "স্মার্টফোন বাজারে স্থানীয় ব্র্যান্ডের উত্থান" },
  { id: "mr4", num: "4", numClass: "text-[#D8D5CD]", image: "https://picsum.photos/seed/mr4/130/130", category: "DevOps",     views: "7.1k",  read: "9 min", title: "Self-hosting in 2026: the quiet comeback" },
  { id: "mr5", num: "5", numClass: "text-[#D8D5CD]", image: "https://picsum.photos/seed/mr5/130/130", category: "Culture",    views: "6.3k",  read: "6 min", title: "Why long-form writing is winning again online" },
  { id: "mr6", num: "6", numClass: "text-[#D8D5CD]", image: "https://picsum.photos/seed/mr6/130/130", category: "Technology", views: "5.8k",  read: "8 min", title: "The 2026 frontend survey: what teams ship" },
];

// ── Recommended reads (3-col) ─────────────────────────────────────────────────
export const recommendedItems = [
  {
    id: "r1",
    image: "https://picsum.photos/seed/r1/560/380",
    avatar: "https://picsum.photos/seed/ra1/60/60",
    category: "Mobile",
    author: "Imran S.",
    read: "7 min",
    title: "স্মার্টফোন বাজারে স্থানীয় ব্র্যান্ডের উত্থান",
    excerpt: "বাজেট সেগমেন্টে দেশীয় ব্র্যান্ডগুলো কীভাবে আন্তর্জাতিক জায়ান্টদের চ্যালেঞ্জ করছে।",
  },
  {
    id: "r2",
    image: "https://picsum.photos/seed/r2/560/380",
    avatar: "https://picsum.photos/seed/ra2/60/60",
    category: "DevOps",
    author: "Farhan I.",
    read: "9 min",
    title: "Self-hosting in 2026: the quiet comeback",
    excerpt: "Rising cloud bills are pushing small teams back to their own metal.",
  },
  {
    id: "r3",
    image: "https://picsum.photos/seed/r3/560/380",
    avatar: "https://picsum.photos/seed/ra3/60/60",
    category: "Culture",
    author: "Rumana A.",
    read: "6 min",
    title: "Why long-form writing is winning again online",
    excerpt: "As feeds fill with noise, readers are returning to depth.",
  },
];
