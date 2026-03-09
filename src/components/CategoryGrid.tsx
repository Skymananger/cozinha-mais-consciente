"use client";
import Link from "next/link";
import { useState } from "react";

const categories = [
  { slug: "panelas-e-saude", label: "Panelas e Saúde", desc: "Materiais seguros e riscos térmicos", emoji: "🍳", color: "var(--sage-pale)", border: "var(--sage-muted)" },
  { slug: "contaminacao", label: "Contaminação", desc: "PFAS, Metais Pesados e Agrotóxicos", emoji: "⚠️", color: "var(--sage-pale)", border: "var(--sage-muted)" },
  { slug: "alimentacao-consciente", label: "Alimentação Consciente", desc: "Nutrição e Escolha Inteligente", emoji: "🥦", color: "var(--sage-pale)", border: "var(--sage-muted)" },
  { slug: "dicas-da-cozinha", label: "Dicas da Cozinha", desc: "Hábitos e Práticas de Segurança", emoji: "💡", color: "var(--sage-pale)", border: "var(--sage-muted)" },
];

export default function CategoryGrid() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="grid-2" style={{ maxWidth: 900, margin: "0 auto" }}>
      {categories.map((cat) => (
        <Link key={cat.slug} href={`/categoria/${cat.slug}`} style={{ textDecoration: "none" }}>
          <div
            onMouseEnter={() => setHovered(cat.slug)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              padding: "1.6rem 1.75rem",
              background: hovered === cat.slug ? cat.color : "var(--white)",
              border: `1.5px solid ${hovered === cat.slug ? cat.border : "var(--border-light)"}`,
              borderRadius: "var(--radius)",
              transition: "all 0.25s ease",
              cursor: "pointer",
              transform: hovered === cat.slug ? "translateY(-3px)" : "none",
              boxShadow: hovered === cat.slug ? "var(--shadow-md)" : "var(--shadow-xs)",
            }}
          >
            <div style={{
              width: 52,
              height: 52,
              borderRadius: "var(--radius-sm)",
              background: cat.color,
              border: `1.5px solid ${cat.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
              flexShrink: 0,
              transition: "transform 0.2s",
              transform: hovered === cat.slug ? "scale(1.08)" : "scale(1)",
            }}>
              {cat.emoji}
            </div>
            <div>
              <div style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "1.05rem",
                color: "var(--gray-800)",
                marginBottom: "0.2rem",
              }}>
                {cat.label}
              </div>
              <div style={{ fontSize: "0.83rem", color: "var(--text-light)" }}>{cat.desc}</div>
            </div>
            <div style={{
              marginLeft: "auto",
              color: "var(--sage)",
              fontSize: "1.1rem",
              opacity: hovered === cat.slug ? 1 : 0,
              transform: hovered === cat.slug ? "translateX(0)" : "translateX(-6px)",
              transition: "all 0.2s",
            }}>
              →
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
