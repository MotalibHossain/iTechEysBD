import { Bold, ImagePlus, Italic, Link2, List, ListOrdered, Quote, Underline, type LucideIcon } from "lucide-react";

export type CategoryHero = {
  name: string;
  headline: string;
  blurb: string;
  count: string;
};

export type ContactInfo = {
  title: string;
  first: string;
  second: string;
};

export type ServiceItem = {
  glyph: string;
  title: string;
  eyebrow: string;
  description: string;
  deliverables: string;
  bestFor: string;
  includes: string[];
};

export type ServicePlan = {
  name: string;
  price: string;
  features: string[];
};

export type EditorTool = {
  icon: LucideIcon;
  label: string;
};

export const categoryNames = ["All", "Technology", "Economy", "AI & ML", "Design", "Culture"] as const;

export const categoryHeroes: CategoryHero[] = [
  { name: "All", headline: "Every story we've published", blurb: "Browse the full archive across technology, economy, design and culture.", count: "1,240" },
  { name: "Technology", headline: "প্রযুক্তির সর্বশেষ — Technology", blurb: "Hardware, software, the web and the people building it — reported in English and বাংলা.", count: "312" },
  { name: "Economy", headline: "অর্থনীতি — Economy & Markets", blurb: "Macro trends, markets and the policy decisions shaping everyday life.", count: "128" },
  { name: "AI & ML", headline: "AI & Machine Learning", blurb: "Models, tools and the real-world impact of artificial intelligence.", count: "94" },
  { name: "Design", headline: "Design & Product", blurb: "Craft, process and the ideas behind great digital products.", count: "156" },
  { name: "Culture", headline: "সংস্কৃতি — Culture", blurb: "Film, books, travel and the conversations of the moment.", count: "77" },
];

export const categoryWidgetTabs = ["নতুন", "হট", "অন্যান্য"] as const;

export const categoryWidgetLists: string[][] = [
  [
  "পুলিশ বোধ হয় মানুষ নয়, এই পৃথিবীর বাইরের ভিন্ন কোন গ্রহের প্রাণী!",
  "এক দিনের জন্য Facebook বন্ধ হলে কি কি ঘটতে পারে?",
  "ই-মেইল ব্যবহারে বড় বিপর্যয় প্রোগ্রামিং ত্রুটির কারণে",
  "কম্পিউটার থেকে অ্যান্ড্রয়েড ফোনে ছবি ও ফাইল পাঠাবেন যেভাবে",
  "উইন্ডোজের যে দুটি সংস্করণ সমর্থন করবে না গুগল ড্রাইভ",
  "ফ্রিল্যান্সিং হলো স্বাধীন বা মুক্তপেশা",
  ],
  ["Apple ships its first foldable to Asian markets", "Self-hosting in 2026: the quiet comeback", "Open-source Bangla LLM crosses 2M downloads", "Why long-form writing is winning again", "Dhaka's fintech founders raise a record quarter", "Designing for calm: slower interfaces"],
  ["সিলেটের চা-বাগানে ধীরে ধীরে ফিরছে পর্যটক", "The four-day week experiments quietly working", "বাজেটে ভোগ্যপণ্যে শুল্ক ছাড়ের সম্ভাবনা", "The race to map the Bay of Bengal's deep currents", "স্মার্টফোন বাজারে স্থানীয় ব্র্যান্ডের উত্থান", "রেমিট্যান্স বাড়লেও স্বস্তি নেই বাজারে"],
];

export const contactInfo: ContactInfo[] = [
  { title: "Email us", first: "hello@itecheys.com", second: "press@itecheys.com" },
  { title: "Call us", first: "+880 1700 000000", second: "Sun–Thu, 10am–6pm" },
  { title: "Visit", first: "Level 7, Tech Park", second: "Dhaka 1212, Bangladesh" },
];

export const contactSubjects = ["General enquiry", "Pitch a story", "Advertising & partnerships", "Press"];

export const contactFields = [
  { label: "Full name", placeholder: "Your name", type: "text" },
  { label: "Email", placeholder: "you@email.com", type: "email" },
] as const;

export const serviceItems: ServiceItem[] = [
  { glyph: "01", title: "Blog management", eyebrow: "Keep publishing consistent", description: "We help run the publishing side of your blog, from a workable editorial calendar to uploading, formatting and maintaining finished articles.", deliverables: "Editorial calendar, publishing workflow, on-page checks", bestFor: "Teams that have good ideas but need a dependable publishing rhythm.", includes: ["Editorial calendar and topic tracking", "Article upload, formatting and image placement", "Category, tag and internal-link cleanup"] },
  { glyph: "02", title: "Web development", eyebrow: "Build a better home online", description: "We design and develop fast, responsive websites for publishers, small teams and growing businesses using practical modern tools.", deliverables: "Page design, Next.js development, responsive implementation", bestFor: "Businesses, creators and publishers who need a polished website that is easy to maintain.", includes: ["Responsive page and component development", "Contact forms and practical integrations", "Launch support and handover guidance"] },
  { glyph: "03", title: "Content strategy", eyebrow: "Know what to publish next", description: "We turn your goals, audience and existing content into a clear plan that gives every article a job and every channel a direction.", deliverables: "Audience review, topic pillars, 90-day content plan", bestFor: "People starting a blog or trying to make an inconsistent content effort useful.", includes: ["Audience and existing-content review", "Topic pillars and search-informed ideas", "A realistic 30 or 90-day publishing plan"] },
  { glyph: "04", title: "Writing & editing", eyebrow: "Make useful ideas readable", description: "We research, write and edit helpful content in English and বাংলা, with an editorial process suited to technical and web-focused subjects.", deliverables: "Briefs, articles, editing, fact and readability checks", bestFor: "Teams that need clear, trustworthy writing but do not have an editor available every day.", includes: ["Article briefs shaped around a clear reader", "Original writing or careful structural editing", "Fact, clarity, grammar and publishing checks"] },
  { glyph: "05", title: "Technical support", eyebrow: "Fix the things that slow you down", description: "We troubleshoot website issues, improve existing pages and handle the technical tasks that are easy to postpone but costly to ignore.", deliverables: "Bug fixes, content updates, integrations and maintenance", bestFor: "Website owners with a bug, update or technical task blocking their next step.", includes: ["Issue diagnosis and a plain-language explanation", "Focused fixes for pages, forms or layouts", "Small updates, maintenance and improvement work"] },
  { glyph: "06", title: "SEO & performance", eyebrow: "Help the right people find you", description: "We improve the foundations behind discoverability, from technical SEO and structured content to speed, accessibility and analytics.", deliverables: "SEO audit, performance fixes, metadata and measurement", bestFor: "Sites that publish regularly but are difficult to find, slow to use or hard to measure.", includes: ["Technical SEO and metadata review", "Speed, mobile and accessibility improvements", "Analytics setup and a prioritized action list"] },
];

export const servicePlans: ServicePlan[] = [
  { name: "Starter", price: "$0", features: ["1 free theme", "Community support", "Basic SEO checklist"] },
  { name: "Publisher", price: "$49", features: ["All themes included", "Priority support", "Advanced SEO & analytics", "Unlimited posts"] },
  { name: "Studio", price: "Custom", features: ["Custom theme build", "Dedicated editor", "Migration included"] },
];

export const editorTips = ["A strong headline is 6–12 words and promises one clear idea.", "Break long text with subheadings, quotes and images.", "Mix English and বাংলা naturally — your readers do too."];

export const editorTools: EditorTool[] = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Underline, label: "Underline" },
  { icon: Quote, label: "Quote" },
  { icon: List, label: "Bullet list" },
  { icon: ListOrdered, label: "Numbered list" },
  { icon: Link2, label: "Link" },
  { icon: ImagePlus, label: "Image" },
];

export const themeStats = [
  ["40+", "Themes"],
  ["120k+", "Downloads"],
  ["4.8★", "Avg rating"],
] as const;

export const themeFilters = ["All themes", "Magazine", "Minimal", "Tech blog", "Newsroom", "Portfolio"];

export const featuredTheme = {
  name: "Broadsheet",
  badge: "Free",
  rating: "4.9",
  price: "Free",
  downloads: "12.4k",
  description: "A classic newsroom layout with a bold front page and infinite article feeds.",
  tags: ["Magazine", "Dark mode", "RTL"],
  image: "https://picsum.photos/seed/broadsheet-theme/900/620",
};
