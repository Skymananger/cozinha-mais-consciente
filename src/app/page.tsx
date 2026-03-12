"use client";
import { defaultArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import CategoryGrid from "@/components/CategoryGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function Home() {
  const articles = defaultArticles.filter(a => a.status === 'Publicado').slice(0, 6);
  const featured = defaultArticles.find(a => a.featured) || articles[0];

  return (
    <>
      <Header />

      {/* Hero — Editorial High Impact */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--gradient-hero)",
        padding: "8rem 0 7rem",
        textAlign: "center"
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            padding: "0.5rem 1.5rem",
            borderRadius: "var(--radius-pill)",
            color: "white",
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "2rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}>
            Curadoria Editorial Independente
          </div>
          
          <h1 style={{
            color: "white",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            maxWidth: "900px",
            margin: "0 auto 1.5rem",
            lineHeight: 1.1
          }}>
            Você controla o que compra, mas controla o que sua panela <em style={{ fontStyle: "italic", opacity: 0.9 }}>adiciona à comida?</em>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.25rem",
            maxWidth: "600px",
            margin: "0 auto 3rem",
            fontWeight: 400
          }}>
            Informação técnica sobre saúde e utensílios para quem leva o bem-estar a sério.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="blob" style={{ width: "400px", height: "400px", background: "white", top: "-100px", right: "-100px" }} />
      </section>

      {/* Latest Articles */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Últimas Publicações</h2>
            <div style={{ width: "60px", height: "4px", background: "var(--sage)" }} />
          </div>
          
          <div className="grid-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Why it Matters — Professional Icons */}
      <section className="section" style={{ background: "white", borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.2rem" }}>Por que isso importa</h2>
          </div>

          <div className="grid-3">
            {[
              { 
                icon: "🩺", 
                title: "Saúde", 
                desc: "O que entra em contato com seu alimento é tão importante quanto o próprio ingrediente." 
              },
              { 
                icon: "🧠", 
                title: "Consciência", 
                desc: "Conhecimento técnico para questionar padrões industriais e fazer escolhas informadas." 
              },
              { 
                icon: "✔️", 
                title: "Escolha Informada", 
                desc: "Curadoria rigorosa baseada em evidências, sem a pressão de marcas ou publicidade." 
              }
            ].map((item) => (
              <div key={item.title} style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>{item.icon}</div>
                <h3 style={{ marginBottom: "1rem" }}>{item.title}</h3>
                <p style={{ fontSize: "1rem" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="section" style={{ background: "var(--sage-pale)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <p style={{ 
            fontSize: "1.5rem", 
            fontFamily: "var(--font-heading)", 
            color: "var(--sage-dark)",
            fontStyle: "italic",
            lineHeight: 1.5 
          }}>
            "O Cozinha Mais Consciente é um portal de curadoria independente sobre saúde, alimentação e utensílios de cozinha. Reunimos informação técnica e indicamos profissionais especializados para quem leva saúde a sério."
          </p>
        </div>
      </section>

      {/* Newsletter / Lead Capture */}
      <section className="section" style={{ background: "white", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "2rem" }}>Faça parte da nossa comunidade</h2>
            <p style={{ color: "var(--text-light)", marginTop: "0.5rem" }}>
              Receba dicas sobre alimentação saudável, escolha de utensílios e muito mais.
            </p>
          </div>
          <LeadCaptureForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
