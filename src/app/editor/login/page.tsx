"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = "/editor"; // Force full reload to apply server-side cookie immediately
      } else {
        setError(data.message || "Senha incorreta.");
        setLoading(false);
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "var(--white)", padding: "3rem", borderRadius: "var(--radius)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Acesso Restrito</h2>
        
        {error && (
          <div style={{ background: "#FEE2E2", color: "#B91C1C", padding: "1rem", borderRadius: "var(--radius-sm)", marginBottom: "1.5rem", fontSize: "0.9rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 600 }}>Senha do Editor</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", fontSize: "1rem" }}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: "100%", opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
