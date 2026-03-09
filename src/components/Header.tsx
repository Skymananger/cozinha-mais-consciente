"use client";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Panelas e Saúde", href: "/categoria/panelas-e-saude" },
  { label: "Contaminação", href: "/categoria/contaminacao" },
  { label: "Alimentação Consciente", href: "/categoria/alimentacao-consciente" },
  { label: "Dicas da Cozinha", href: "/categoria/dicas-da-cozinha" },
  { label: "Sobre", href: "/sobre" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <header style={{
      background: "var(--white)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "var(--shadow-sm)",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 1.25rem",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <LogoIcon />
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "var(--sage-dark)", lineHeight: 1.1 }}>
              Cozinha Mais
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--sage)", lineHeight: 1.1 }}>
              Consciente
            </div>
          </div>
        </Link>

        {/* Desktop Nav — hidden on mobile via CSS class */}
        <nav className="header-desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "0.5rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: hoveredLink === link.href ? "var(--sage-dark)" : "var(--text-muted)",
                background: hoveredLink === link.href ? "var(--sage-pale)" : "transparent",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger — visible only on mobile via CSS class */}
        <button
          className="header-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div style={{ width: 24, height: 2, background: "var(--gray-800)", marginBottom: 5, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: "var(--gray-800)", marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
          <div style={{ width: 24, height: 2, background: "var(--gray-800)", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "var(--white)",
          borderTop: "1px solid var(--border)",
          padding: "0.5rem 1.25rem 1rem",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 0",
                borderBottom: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function LogoIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#EFF5ED"/>
      <path d="M10 22 C10 29 14 33 20 33 C26 33 30 29 30 22 L28 18 L12 18 Z" fill="#7C9A6E"/>
      <rect x="9" y="16" width="22" height="4" rx="2" fill="#3D5C35"/>
      <rect x="5" y="17" width="5" height="3" rx="1.5" fill="#3D5C35"/>
      <rect x="30" y="17" width="5" height="3" rx="1.5" fill="#3D5C35"/>
      <path d="M20 10 C20 10 14 14 14 20 C14 22 16 24 20 23 C24 24 26 22 26 20 C26 14 20 10 20 10 Z" fill="white" opacity="0.9"/>
      <path d="M20 10 L20 22" stroke="#7C9A6E" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
