import { defaultArticles, categoryLabels, Category } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [
    { slug: 'panelas-e-saude' },
    { slug: 'contaminacao' },
    { slug: 'alimentacao-consciente' },
    { slug: 'dicas-da-cozinha' }
  ];
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const category = slug as Category;
  const label = categoryLabels[category];

  if (!label) notFound();

  const articles = defaultArticles.filter(a => a.category === category && a.status === 'Publicado');

  return (
    <>
      <Header />
      <main className="section" style={{ background: "var(--cream)", minHeight: "80vh" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>Explorar Tema</span>
            <h1 style={{ fontSize: "2.5rem" }}>{label}</h1>
            <div style={{ width: "60px", height: "4px", background: "var(--sage)", marginTop: "1rem" }} />
          </div>

          <div className="grid-3">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <p style={{ textAlign: "center", padding: "4rem", color: "var(--text-light)" }}>
              Novos artigos nesta categoria estão sendo revisados e serão publicados em breve.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
