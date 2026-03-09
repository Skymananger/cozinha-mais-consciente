"use client";
import Link from "next/link";
import { useState } from "react";
import { Article, categoryLabels, universeIcons } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const href = `/artigo/${article.slug}`;
  const [hovered, setHovered] = useState(false);

  // Helper for date formatting
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  };

  if (featured) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        <article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            background: "var(--white)",
            border: "1px solid var(--border-light)",
            boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
            transform: hovered ? "translateY(-4px)" : "none",
            transition: "all 0.3s ease",
            minHeight: 380,
          }}
        >
          {/* Content side */}
          <div style={{
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            background: "var(--card-bg)"
          }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <span className="badge">{categoryLabels[article.category]}</span>
              <span style={{ fontSize: "1.2rem" }}>{universeIcons[article.universe]}</span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
              color: "var(--gray-800)",
              lineHeight: 1.2,
            }}>
              {article.title}
            </h2>
            <p style={{
              color: "var(--text-muted)",
              fontSize: "1rem",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {article.excerpt}
            </p>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "var(--sage-dark)",
              fontWeight: 700,
              fontSize: "0.95rem",
              marginTop: "1rem",
            }}>
              Continuar leitura →
            </span>
          </div>

          {/* Placeholder/Visual side */}
          <div style={{ 
            background: "var(--sage-pale)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontSize: "4rem"
          }}>
            {universeIcons[article.universe]}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: "100%",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          background: "var(--white)",
          border: "1px solid var(--border-light)",
          boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-xs)",
          transform: hovered ? "translateY(-5px)" : "none",
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "1rem",
          background: article.type === 'PILLAR' ? "var(--sage-pale)" : "var(--white)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="badge" style={{ fontSize: "0.65rem" }}>{categoryLabels[article.category]}</span>
            <span style={{ fontSize: "1rem" }}>{universeIcons[article.universe]}</span>
          </div>
          
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "var(--gray-800)",
            lineHeight: 1.3,
            flex: 1
          }}>
            {article.title}
          </h3>
          
          <p style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {article.excerpt}
          </p>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border-light)",
            marginTop: "auto",
            fontSize: "0.75rem",
            color: "var(--text-light)"
          }}>
            <span>{formatDate(article.publishedAt)}</span>
            <span style={{ fontWeight: 600, color: "var(--sage-dark)" }}>{article.readTime} min ⏱</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
