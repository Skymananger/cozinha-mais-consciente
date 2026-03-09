import { Article, defaultArticles, categoryLabels, universeIcons } from "@/lib/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return defaultArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const article = defaultArticles.find((a) => a.slug === slug);

  if (!article) notFound();

  const relatedArticles = defaultArticles
    .filter((a) => a.universe === article.universe && a.id !== article.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "var(--white)" }}>
        {/* Article Header */}
        <header style={{ 
          padding: "4rem 0 3rem", 
          background: "var(--cream)", 
          borderBottom: "1px solid var(--border-light)" 
        }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <Link 
              href={`/categoria/${article.category}`} 
              className="badge" 
              style={{ marginBottom: "1.5rem" }}
            >
              {categoryLabels[article.category]}
            </Link>
            
            <h1 style={{ 
              fontSize: "clamp(2rem, 5vw, 3.2rem)", 
              lineHeight: 1.1, 
              marginBottom: "1.5rem" 
            }}>
              {article.title}
            </h1>
            
            <p style={{ 
              fontSize: "1.25rem", 
              color: "var(--text-muted)", 
              marginBottom: "2rem",
              lineHeight: 1.5
            }}>
              {article.subtitle}
            </p>

            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1.5rem", 
              fontSize: "0.85rem", 
              color: "var(--text-light)",
              fontWeight: 500
            }}>
              <span>{universeIcons[article.universe]} Universo {article.universe.toUpperCase()}</span>
              <span>•</span>
              <span>{article.readTime} min de leitura</span>
              <span>•</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="section">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div className="article-content">
              {/* This is a placeholder for the actual content rendering */}
              <p>{article.excerpt}</p>
              
              <div style={{ 
                background: "var(--sage-pale)", 
                padding: "2rem", 
                borderRadius: "var(--radius-sm)", 
                margin: "2.5rem 0",
                borderLeft: "4px solid var(--sage)"
              }}>
                <h4 style={{ color: "var(--sage-dark)", marginBottom: "0.5rem", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Sabia que?</h4>
                <p style={{ margin: 0, fontSize: "1rem", color: "var(--sage-dark)" }}>
                  As gorduras superaquecidas em materiais reativos podem sofrer oxidação acelerada, gerando compostos que interferem no equilíbrio celular.
                </p>
              </div>

              <div dangerouslySetInnerHTML={{ __html: article.content }} />

              {/* CTA-2: Inline Contextual */}
              <div style={{ 
                background: "#EEF4EE", 
                padding: "2.5rem", 
                borderRadius: "var(--radius)", 
                margin: "4rem 0",
                textAlign: "center"
              }}>
                <h3 style={{ marginBottom: "1rem" }}>Quer saber quais utensílios têm histórico de uso sem interferência comprovada?</h3>
                <Link 
                  href="https://wa.me/5500000000000?text=Olá!%20Estou%20lendo%20o%20artigo%20sobre%20curadoria%20e%20gostaria%20de%20uma%20indicação%20personalizada."
                  target="_blank"
                  className="btn btn-primary"
                  style={{ marginTop: "1rem" }}
                >
                  👉 Receba uma indicação personalizada →
                </Link>
              </div>

              {/* Dynamic Internal Linking */}
              {relatedArticles.length > 0 && (
                <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid var(--border-light)" }}>
                  <h3 style={{ marginBottom: "2rem" }}>Continue sua pesquisa</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {relatedArticles.map(rel => (
                      <Link key={rel.id} href={`/artigo/${rel.slug}`} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "1rem",
                        padding: "1rem",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--cream)",
                        transition: "transform 0.2s"
                      }} className="hover-lift">
                        <span style={{ fontSize: "1.5rem" }}>{universeIcons[rel.universe]}</span>
                        <span style={{ fontWeight: 600, color: "var(--gray-800)" }}>{rel.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA-3: Card Final do Artigo */}
            <div style={{ 
              background: "#F0F4F0", 
              padding: "4rem 2rem", 
              borderRadius: "var(--radius)", 
              marginTop: "5rem",
              textAlign: "center",
              border: "1px solid var(--sage-muted)"
            }}>
              <h2 style={{ marginBottom: "1rem" }}>Chegou até aqui. Isso já diz muito.</h2>
              <p style={{ maxWidth: "600px", margin: "0 auto 2.5rem" }}>
                Quem pesquisa esse assunto com profundidade geralmente está pronto para uma escolha mais consciente. Se quiser orientação especializada sobre utensílios, nossa curadoria está disponível.
              </p>
              <Link 
                href={`https://wa.me/5500000000000?text=Olá!%20Li%20o%20artigo%20"${article.title}"%20no%20Cozinha%20Mais%20Consciente%20e%20gostaria%20de%20uma%20indicação%20de%20utensílios.`}
                target="_blank"
                className="btn btn-primary"
                style={{ background: "var(--sage-dark)", padding: "1.2rem 2.5rem" }}
              >
                Quero a indicação →
              </Link>
            </div>

            {/* Disclaimer no rodapé do artigo */}
            <p style={{ 
              marginTop: "4rem", 
              fontSize: "0.85rem", 
              color: "var(--text-light)", 
              textAlign: "center",
              fontStyle: "italic",
              lineHeight: 1.6
            }}>
              Conteúdo exclusivamente educativo. Não representamos fabricantes. As informações não substituem orientação profissional de saúde.
            </p>
          </div>
        </article>

        {/* CTA-4: Barra Discreta de Rodapé */}
        <div style={{ 
          background: "var(--white)", 
          borderTop: "1px solid var(--border-light)", 
          padding: "0.75rem 0",
          textAlign: "center"
        }}>
          <Link href="/indicacao" style={{ 
            fontSize: "0.85rem", 
            color: "var(--text-muted)", 
            fontWeight: 500,
            textDecoration: "underline"
          }}>
            Curadoria disponível para quem busca utensílios com histórico de uso seguro. →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
