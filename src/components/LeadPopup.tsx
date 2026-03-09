"use client";
import { useState, useEffect, useRef } from "react";

import { CONTACT_INFO } from "@/lib/constants";

const WEBHOOK_URL = ""; // Will be filled later
const WHATSAPP_NUMBER = CONTACT_INFO.WHATSAPP_NUMBER;
const POPUP_DELAY_MS = 40000;

interface LeadPopupProps {
  disableTimeout?: boolean; // for admin preview
}

export default function LeadPopup({ disableTimeout = false }: LeadPopupProps) {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (disableTimeout) return;
    // Don't show again if already dismissed in this session
    if (sessionStorage.getItem("popup_dismissed")) return;

    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, POPUP_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [disableTimeout]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("popup_dismissed", "1");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, source: "popup", url: window.location.href }),
        });
      }
      setSubmitted(true);
    } catch {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  if (!visible) return null;

  return (
    <div className="overlay" onClick={handleDismiss}>
      <div
        className="scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "var(--radius)",
          padding: "2.5rem",
          maxWidth: 440,
          width: "100%",
          position: "relative",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Close */}
        <button
          onClick={handleDismiss}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.4rem",
            color: "var(--gray-400)",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {!submitted ? (
          <>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🍃</div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", color: "var(--gray-800)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                Qual panela é segura para a sua família?
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Deixe seus dados e receba orientação gratuita de um especialista.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="popup-name">Seu nome</label>
                <input
                  id="popup-name"
                  type="text"
                  placeholder="Ex: Maria Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="popup-phone">WhatsApp</label>
                <input
                  id="popup-phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  required
                  maxLength={15}
                />
              </div>

              {error && <p style={{ color: "#e53e3e", fontSize: "0.85rem" }}>{error}</p>}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
              >
                {loading ? "Enviando..." : "Quero saber qual panela usar"}
              </button>
              <p style={{ fontSize: "0.7rem", color: "var(--text-light)", textAlign: "center", marginTop: "0.75rem" }}>
                Protegemos seus dados. Ao clicar, você concorda com nossa <a href="/privacidade" style={{ textDecoration: "underline" }}>Política de Privacidade (LGPD)</a>.
              </p>
            </form>

            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--gray-400)", marginTop: "1rem" }}>
              📵 Sem spam. Seus dados são protegidos.
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>
              Ótimo!
            </h3>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
              Em breve um especialista entrará em contato com você.
            </p>
            <button
              onClick={handleDismiss}
              className="btn btn-outline"
              style={{ marginTop: "1.5rem" }}
            >
              Continuar lendo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
