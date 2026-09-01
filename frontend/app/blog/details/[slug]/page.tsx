
import { articleData } from "@/lib/data/article-data";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleHero from "@/components/blog/ArticleHero";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleSidebar from "@/components/blog/ArticleSidebar";
import RelatedArticles from "@/components/blog/RelatedArticles";
import CommentsSection from "@/components/blog/CommentsSection";

function getArticle(_slug: string) {
  return articleData;
}

export default function DetailsPage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);

  return (
    <main>
      <ReadingProgress />

      <div className="page-shell pt-10">

        <ArticleHeader article={article} />

        <div className="mt-7.5">
          <ArticleHero article={article} />
        </div>

        {/* Body + sticky sidebar */}
        <div className="article-content-grid mt-12 items-start">
          <ArticleBody article={article} />
          <ArticleSidebar article={article} />
        </div>

        <div className="mt-16">
          <RelatedArticles related={article.related} />
        </div>

        <CommentsSection initialComments={article.comments} />

      </div>
    </main>
  );
}