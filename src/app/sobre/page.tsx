import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: "Somos um portal independente dedicado a levar informação de qualidade sobre saúde, alimentação e cozinha consciente para famílias brasileiras.",
};

export default function SobrePage() {
  return (
    <>
      <Header />

      {/* Hero — Pure Editorial */}
      <section style={{ 
        background: "var(--gradient-hero)", 
        padding: "6rem 0", 
        textAlign: "center" 
      }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <h1 style={{ 
            fontFamily: "var(--font-heading)", 
            color: "white", 
            fontSize: "clamp(2rem, 5vw, 3rem)", 
            fontWeight: 700, 
            marginBottom: "1.5rem" 
          }}>
            Sobre o Cozinha Mais Consciente
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.2rem", lineHeight: 1.6 }}>
            Curadoria independente para quem busca transparência técnica na cozinha brasileira.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ background: "var(--sage-pale)", borderLeft: "4px solid var(--sage)", borderRadius: "var(--radius-sm)", padding: "2.5rem", marginBottom: "3rem" }}>
            <p style={{ fontSize: "1.4rem", fontStyle: "italic", color: "var(--sage-dark)", lineHeight: 1.5, margin: 0, fontFamily: "var(--font-heading)" }}>
              "A indústria define o que é permitido. Nós questionamos se 'permitido' é o mesmo que 'saudável'."
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Nossa Missão</h2>
              <p>Acreditamos que o conhecimento técnico é a única ferramenta capaz de proteger a saúde da família brasileira. Em um mercado saturado de informações comerciais, o Cozinha Mais Consciente atua como um filtro rigoroso, priorizando a evidência científica e a segurança biológica em cada análise de material ou método de cozimento.</p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Autoridade Editorial</h2>
              <p>Produzimos conteúdo editorial aprofundado sobre os pilares que sustentam uma cozinha livre de interferências indesejadas:</p>
              <ul style={{ margin: "1.5rem 0 0 1.5rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><strong>Ciência dos Materiais:</strong> O impacto real de metais e polímeros no organismo.</li>
                <li><strong>Bioacumulação:</strong> Como evitar a carga tóxica silenciosa do dia a dia.</li>
                <li><strong>Densidade Nutricional:</strong> Técnicas para cozinhar preservando o potencial vital do alimento.</li>
                <li><strong>Curadoria de Especialistas:</strong> Conectamos leitores a profissionais que compartilham de nossa visão técnica.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Transparência</h2>
              <p>O Cozinha Mais Consciente é um portal exclusivamente informativo. Nossa independência é o que garante a liberdade de questionar padrões estabelecidos. Não vendemos produtos; entregamos clareza para que sua decisão seja baseada em fatos, não em marketing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: "var(--beige)" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", textAlign: "center", marginBottom: "2.5rem" }}>
            Nossos valores
          </h2>
          <div className="grid-3">
            {[
              { emoji: "🔬", title: "Cura técnica", desc: "Nossas publicações se apoiam em pesquisas acadêmicas, dados de órgãos de saúde e critérios técnicos de segurança." },
              { emoji: "🤝", title: "Transparência", desc: "Nossas recomendações seguem rigorosos padrões internos de qualidade, sem interferências externas." },
              { emoji: "💚", title: "Propósito real", desc: "Existimos para ajudar famílias a fazerem escolhas mais seguras e conscientes dentro de casa." },
            ].map((v) => (
              <div key={v.title} style={{ textAlign: "center", padding: "2rem 1.5rem", background: "var(--white)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{v.emoji}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", marginBottom: "0.75rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
