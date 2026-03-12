"use client";
import { useState, useEffect, useRef } from "react";

import { CONTACT_INFO, WHATSAPP_URL } from "@/lib/constants";

const WEBHOOK_URL = "/api/leads/webhook";
const POPUP_DELAY_MS = 40000;

interface LeadPopupProps {
  disableTimeout?: boolean; // for admin preview
}

export default function LeadPopup({ disableTimeout = false }: LeadPopupProps) {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
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
    if (!consent) {
      setError("Você precisa concordar com a Política de Privacidade.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          consent: true,
          source: "popup",
          url: window.location.href,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao enviar.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Algo deu errado. Tente novamente.";
      setError(message);
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

              {/* LGPD Consent Checkbox */}
              <label
                htmlFor="popup-consent"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  lineHeight: 1.5,
                }}
              >
                <input
                  id="popup-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (e.target.checked) setError("");
                  }}
                  style={{ marginTop: "0.15rem", accentColor: "var(--sage)" }}
                />
                <span>
                  Concordo com o tratamento dos meus dados conforme a{" "}
                  <a href="/privacidade" target="_blank" style={{ textDecoration: "underline", color: "var(--sage-dark)" }}>
                    Política de Privacidade (LGPD)
                  </a>
                  . Meus dados serão usados exclusivamente para contato sobre orientação de utensílios.
                </span>
              </label>

              {error && <p style={{ color: "#e53e3e", fontSize: "0.85rem", margin: 0 }}>{error}</p>}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
              >
                {loading ? "Enviando..." : "Quero saber qual panela usar"}
              </button>
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
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Seus dados foram registrados. Clique abaixo para iniciar sua conversa com nosso especialista via WhatsApp:
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "1rem", width: "100%", justifyContent: "center" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar com Especialista no WhatsApp
            </a>
            <button
              onClick={handleDismiss}
              style={{ marginTop: "1rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", color: "var(--text-light)", textDecoration: "underline" }}
            >
              Continuar lendo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
