import type { Metadata } from "next";
import { articleData } from "@/lib/data/article-data";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleHero from "@/components/blog/ArticleHero";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleSidebar from "@/components/blog/ArticleSidebar";
import RelatedArticles from "@/components/blog/RelatedArticles";
import CommentsSection from "@/components/blog/CommentsSection";

// Next 16: params is a Promise and must be awaited.
type Params = Promise<{ slug: string }>;

function getArticle(_slug: string) {
  return articleData;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return {
    title: article.title,
    description: article.subtitle,
    alternates: { canonical: `/blog/details/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.subtitle,
      images: article.heroImage ? [article.heroImage] : undefined,
    },
  };
}

export default async function DetailsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);

  return (
    <>
      <ReadingProgress />

      {/* Single container + flex-col gap = one place to tune vertical rhythm */}
      <main className="container py-10 flex flex-col gap-12">
        <ArticleHeader article={article} />

        {/* Hero + body share the left column; sidebar starts at the hero top. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 xl:gap-10 items-start">
          <div className="flex flex-col gap-10 min-w-0">
            <ArticleHero article={article} />
            <ArticleBody article={article} />
          </div>
          <ArticleSidebar article={article} />
        </div>

        <RelatedArticles related={article.related} />
        <CommentsSection initialComments={article.comments} />
      </main>
    </>
  );
}