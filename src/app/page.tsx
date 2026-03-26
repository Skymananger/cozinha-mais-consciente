"use client";
import { defaultArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import CategoryGrid from "@/components/CategoryGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function Home() {
  const published = defaultArticles.filter(a => a.status === 'Publicado');
  // Intercala um artigo de cada universo para mostrar diversidade de temas na home
  const universeOrder: Array<typeof published[0]['universe']> = ['aluminio', 'pfas', 'nutricao', 'metais-pesados', 'consciencia'];
  const seen = new Set<string>();
  const interleaved: typeof published = [];
  for (const u of universeOrder) {
    const pick = published.find(a => a.universe === u && !seen.has(a.id));
    if (pick) { interleaved.push(pick); seen.add(pick.id); }
  }
  // Completa com os restantes até 6
  for (const a of published) {
    if (interleaved.length >= 6) break;
    if (!seen.has(a.id)) { interleaved.push(a); seen.add(a.id); }
  }
  const articles = interleaved;

  const featured = defaultArticles.find(a => a.featured) || articles[0];

  return (
    <>
      <Header />

      {/* Hero — Editorial High Impact */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#2C3E2D", // Fallback sage dark
        padding: "8rem 0 7rem",
        textAlign: "center"
      }}>
        {/* Hero Background Image */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/images/home-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          zIndex: 0
        }} />
        
        {/* Gradient Overlay for Readability */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(44, 62, 45, 0.8), rgba(44, 62, 45, 0.6))",
          zIndex: 0
        }} />

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
            lineHeight: 1.1,
            textShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}>
            Você controla o que compra, mas controla o que sua panela <em style={{ fontStyle: "italic", opacity: 0.9 }}>adiciona à comida?</em>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.25rem",
            maxWidth: "600px",
            margin: "0 auto 2rem",
            fontWeight: 400,
            textShadow: "0 1px 5px rgba(0,0,0,0.2)"
          }}>
            Informação técnica sobre saúde e utensílios para quem leva o bem-estar a sério.
          </p>

          {/* Lead Capture no Hero */}
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", marginBottom: "1rem" }}>
              📥 Receba grátis: <strong style={{ color: "white" }}>"7 Sinais de que Sua Panela Está Contaminando Sua Comida"</strong>
            </p>
            <LeadCaptureForm variant="hero" />
          </div>
        </div>
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
      <section className="section" style={{ background: "var(--sage-pale)", padding: "5rem 0" }}>
        <div className="container">
          <LeadCaptureForm variant="section" />
        </div>
      </section>

      <Footer />
    </>
  );
}
