"use client";
import { useState } from "react";
import { defaultArticles, universeIcons, Article } from "@/lib/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EditorPanel() {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [filterUniverse, setFilterUniverse] = useState<string | null>(null);

  const columns = [
    { id: 'A Publicar', label: '📋 A PUBLICAR' },
    { id: 'Em Produção', label: '✍️ EM PRODUÇÃO' },
    { id: 'Em Revisão', label: '🔍 EM REVISÃO' },
    { id: 'Publicado', label: '✅ PUBLICADO' },
  ];

  const filteredArticles = filterUniverse 
    ? articles.filter(a => a.universe === filterUniverse)
    : articles;

  const moveArticle = (id: string, newStatus: any) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const stats = {
    total: 25,
    published: articles.filter(a => a.status === 'Publicado').length
  };

  return (
    <>
      <Header />
      <main style={{ background: "#F4F7F4", minHeight: "100vh", padding: "2rem 0" }}>
        <div className="container">
          {/* Header Editor */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "2rem",
            background: "white",
            padding: "1.5rem 2rem",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-sm)"
          }}>
            <div>
              <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Painel Editorial</h1>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Progresso: <strong>{stats.published} de {stats.total}</strong> artigos publicados
                </span>
                <div style={{ width: "200px", height: "8px", background: "#E8E0D6", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${(stats.published / stats.total) * 100}%`, height: "100%", background: "var(--sage)", transition: "width 0.5s" }} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              {Object.keys(universeIcons).map(u => (
                <button 
                  key={u}
                  onClick={() => setFilterUniverse(filterUniverse === u ? null : u)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--border)",
                    background: filterUniverse === u ? "var(--sage-pale)" : "white",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    borderColor: filterUniverse === u ? "var(--sage)" : "var(--border)"
                  }}
                >
                  {universeIcons[u as keyof typeof universeIcons]} {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Kanban Board */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(4, 1fr)", 
            gap: "1.5rem", 
            alignItems: "start" 
          }}>
            {columns.map(col => (
              <div key={col.id} style={{ 
                background: "#E8EBE8", 
                borderRadius: "var(--radius-sm)", 
                padding: "1rem", 
                minHeight: "70vh" 
              }}>
                <h3 style={{ fontSize: "0.9rem", color: "#555", marginBottom: "1rem", padding: "0 0.5rem" }}>
                  {col.label} ({filteredArticles.filter(a => a.status === col.id).length})
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {filteredArticles.filter(a => a.status === col.id).map(article => (
                    <div 
                      key={article.id}
                      style={{
                        background: "white",
                        padding: "1rem",
                        borderRadius: "var(--radius-xs)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        borderLeft: `4px solid ${article.type === 'PILLAR' ? 'var(--sage)' : '#B0A89E'}`,
                        cursor: "grab"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-light)" }}>
                          {article.type}
                        </span>
                        <span style={{ fontSize: "1rem" }}>{universeIcons[article.universe]}</span>
                      </div>
                      <h4 style={{ fontSize: "0.85rem", lineHeight: 1.4, marginBottom: "0.75rem" }}>{article.title}</h4>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between" }}>
                        <span>📅 {new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
                        {/* Status Cycling (Simple for demo) */}
                        <select 
                          value={article.status} 
                          onChange={(e) => moveArticle(article.id, e.target.value)}
                          style={{ fontSize: "0.7rem", border: "none", background: "#f0f0f0", borderRadius: "4px", padding: "2px" }}
                        >
                          {columns.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
