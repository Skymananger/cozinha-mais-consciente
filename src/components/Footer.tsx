"use client";
import Link from "next/link";

const footerLinks = [
  { label: "Panelas e Saúde", href: "/categoria/panelas-e-saude" },
  { label: "Contaminação", href: "/categoria/contaminacao" },
  { label: "Alimentação Consciente", href: "/categoria/alimentacao-consciente" },
  { label: "Dicas da Cozinha", href: "/categoria/dicas-da-cozinha" },
  { label: "Sobre", href: "/sobre" },
  { label: "Privacidade", href: "/privacidade" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "var(--gray-800)",
      color: "rgba(255,255,255,0.7)",
      padding: "3rem 0 1.5rem",
    }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.3rem", color: "white", marginBottom: "0.75rem" }}>
              Cozinha Mais Consciente
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 340 }}>
              O Cozinha Mais Consciente é um portal de curadoria independente sobre saúde, alimentação e utensílios de cozinha. Reunimos informação técnica e indicamos profissionais especializados para quem leva saúde a sério.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontWeight: 600, color: "white", marginBottom: "1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Seções
            </div>
            <ul style={{ listStyle: "none" }}>
              {footerLinks.map((link) => (
                <li key={link.href} style={{ marginBottom: "0.5rem" }}>
                  <Link href={link.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.2s" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", maxWidth: "800px", margin: "0 auto 1rem" }}>
            © Cozinha Mais Consciente. Conteúdo exclusivamente educativo e informativo. Não representamos fabricantes nem comercializamos produtos. As informações deste portal não substituem orientação médica ou nutricional profissional.
          </p>
        </div>
      </div>
    </footer>
  );
}
