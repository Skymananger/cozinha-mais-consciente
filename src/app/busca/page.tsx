"use client";
import { useSearchParams } from "next/navigation";
import { defaultArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const results = defaultArticles.filter(a => 
    a.status === 'Publicado' && 
    (a.title.toLowerCase().includes(query) || 
     a.subtitle.toLowerCase().includes(query) || 
     a.excerpt.toLowerCase().includes(query) ||
     a.content.toLowerCase().includes(query))
  );

  return (
    <main style={{ minHeight: "100vh", background: "var(--white)" }}>
      <section style={{ padding: "6rem 0 4rem", background: "var(--cream)" }}>
        <div className="container">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Resultados para: <span style={{ color: "var(--sage-dark)" }}>"{query}"</span>
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Encontramos {results.length} artigo{results.length !== 1 ? 's' : ''}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {results.length > 0 ? (
            <div className="grid-3">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
                Não encontramos nenhum artigo com esse termo.
              </p>
              <a href="/" className="btn btn-primary">Voltar para a Home</a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function BuscaPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ padding: "10rem", textAlign: "center" }}>Carregando resultados...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </>
  );
}
