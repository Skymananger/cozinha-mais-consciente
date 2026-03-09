"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cozinha_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cozinha_cookie_consent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      left: "1.5rem",
      right: "1.5rem",
      zIndex: 2000,
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div className="card scale-in" style={{
        pointerEvents: "auto",
        maxWidth: "600px",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--sage-muted)",
        boxShadow: "var(--shadow-lg)",
      }}>
        <p style={{ flex: 1, fontSize: "0.85rem", margin: 0, color: "var(--text-muted)" }}>
          🌿 Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
          <Link href="/privacidade" style={{ textDecoration: "underline", color: "var(--sage-dark)" }}>
            Política de Privacidade
          </Link>.
        </p>
        <button onClick={accept} className="btn btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
