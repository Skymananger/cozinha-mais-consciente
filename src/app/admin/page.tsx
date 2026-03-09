"use client";
import { useState, useEffect } from "react";
import { defaultArticles, categoryLabels, type Article, type Category } from "@/lib/articles";
import Header from "@/components/Header";
import ArticleCTA from "@/components/ArticleCTA";

const ADMIN_PASSWORD = "cozinha2025";

const EMPTY_ARTICLE: Omit<Article, "id"> = {
  slug: "",
  title: "",
  subtitle: "",
  category: "panelas-e-saude",
  categoryLabel: "Panelas e Saúde",
  coverImage: "",
  coverAlt: "",
  publishedAt: new Date().toISOString().split("T")[0],
  readTime: 5,
  excerpt: "",
  content: "<p>Escreva o conteúdo do artigo aqui...</p>",
  metaTitle: "",
  metaDescription: "",
  ogImage: "",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"list" | "edit">("list");
  const [preview, setPreview] = useState(false);

  // Load articles from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cmc_articles");
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      setArticles(defaultArticles);
    }
  }, []);

  const saveToStorage = (arts: Article[]) => {
    localStorage.setItem("cmc_articles", JSON.stringify(arts));
    setArticles(arts);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Senha incorreta.");
    }
  };

  const handleEdit = (article: Article) => {
    setEditing({ ...article });
    setCreating(false);
    setTab("edit");
    setPreview(false);
  };

  const handleCreate = () => {
    const newId = String(Date.now());
    setEditing({ ...EMPTY_ARTICLE, id: newId } as Article);
    setCreating(true);
    setTab("edit");
    setPreview(false);
  };

  const handleSave = () => {
    if (!editing) return;
    // Auto-set categoryLabel
    editing.categoryLabel = categoryLabels[editing.category];
    // Auto-set ogImage from coverImage if empty
    if (!editing.ogImage) editing.ogImage = editing.coverImage;

    let updated: Article[];
    if (creating) {
      updated = [editing, ...articles];
    } else {
      updated = articles.map((a) => (a.id === editing.id ? editing : a));
    }
    saveToStorage(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setCreating(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que quer excluir este artigo?")) return;
    const updated = articles.filter((a) => a.id !== id);
    saveToStorage(updated);
    if (editing?.id === id) {
      setEditing(null);
      setTab("list");
    }
  };

  const handleReset = () => {
    if (!confirm("Isso vai apagar edições e restaurar os artigos padrão. Continuar?")) return;
    localStorage.removeItem("cmc_articles");
    setArticles(defaultArticles);
    setEditing(null);
    setTab("list");
  };

  const updateField = <K extends keyof Article>(key: K, value: Article[K]) => {
    if (!editing) return;
    setEditing({ ...editing, [key]: value });
  };

  // ─── Login screen ───────────────────────────────────────────────
  if (!authenticated) {
    return (
      <>
        <Header />
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ background: "white", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "2.5rem", width: "100%", maxWidth: 400, boxShadow: "var(--shadow-md)" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔒</div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--gray-800)" }}>Área Administrativa</h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.4rem" }}>Acesso restrito</p>
            </div>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="admin-password">Senha</label>
                <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Entrar</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // ─── Admin UI ───────────────────────────────────────────────────
  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh", background: "var(--beige)" }}>
        {/* Admin Header */}
        <div style={{ background: "var(--sage-dark)", color: "white", padding: "1rem 0" }}>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "white" }}>Painel Editorial</h2>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>{articles.length} artigos</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={handleReset} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "0.5rem 1rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.85rem" }}>
                Restaurar padrão
              </button>
              <button onClick={handleCreate} className="btn btn-whatsapp" style={{ padding: "0.6rem 1.25rem", fontSize: "0.9rem" }}>
                + Novo Artigo
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: "white", borderBottom: "1px solid var(--border)" }}>
          <div className="container" style={{ display: "flex", gap: "0" }}>
            {(["list", "edit"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "1rem 1.5rem", background: "none", border: "none", borderBottom: tab === t ? "2px solid var(--sage)" : "2px solid transparent", color: tab === t ? "var(--sage-dark)" : "var(--text-muted)", fontWeight: tab === t ? 600 : 400, cursor: "pointer", fontSize: "0.9rem" }}>
                {t === "list" ? "📋 Lista de Artigos" : "✏️ Editor"}
              </button>
            ))}
          </div>
        </div>

        <div className="container" style={{ padding: "2rem 1.25rem" }}>
          {/* List Tab */}
          {tab === "list" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {articles.map((article) => (
                <div key={article.id} style={{ background: "white", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                  <img src={article.coverImage} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: "var(--radius-sm)", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span className="badge" style={{ marginBottom: "0.25rem", fontSize: "0.7rem" }}>{article.categoryLabel}</span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "var(--gray-800)", marginBottom: "0.25rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{article.title}</h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--gray-400)" }}>/artigo/{article.slug} • {article.readTime} min</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <a href={`/artigo/${article.slug}`} target="_blank" rel="noopener noreferrer" style={{ padding: "0.45rem 0.9rem", borderRadius: "var(--radius-sm)", background: "var(--beige)", color: "var(--text-muted)", fontSize: "0.8rem", border: "1px solid var(--border)", textDecoration: "none" }}>Ver</a>
                    <button onClick={() => handleEdit(article)} style={{ padding: "0.45rem 0.9rem", borderRadius: "var(--radius-sm)", background: "var(--sage-pale)", color: "var(--sage-dark)", fontSize: "0.8rem", border: "1px solid var(--sage-light)", cursor: "pointer" }}>Editar</button>
                    <button onClick={() => handleDelete(article.id)} style={{ padding: "0.45rem 0.9rem", borderRadius: "var(--radius-sm)", background: "#FFF5F5", color: "#C53030", fontSize: "0.8rem", border: "1px solid #FEB2B2", cursor: "pointer" }}>Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Tab */}
          {tab === "edit" && editing && (
            <div style={{ display: "grid", gridTemplateColumns: preview ? "1fr 1fr" : "1fr", gap: "2rem" }}>
              {/* Left: Form */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Toolbar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
                    {creating ? "Novo Artigo" : "Editar Artigo"}
                  </h3>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    {saved && <span style={{ color: "var(--sage)", fontSize: "0.85rem", fontWeight: 600 }}>✓ Salvo!</span>}
                    <button onClick={() => setPreview(!preview)} style={{ padding: "0.5rem 1rem", background: preview ? "var(--sage-pale)" : "white", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.85rem" }}>
                      {preview ? "Fechar Prévia" : "Pré-visualizar"}
                    </button>
                    <button onClick={handleSave} className="btn btn-primary" style={{ padding: "0.65rem 1.5rem" }}>
                      Salvar Artigo
                    </button>
                  </div>
                </div>

                <div style={{ background: "white", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Basic Info */}
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "var(--sage-dark)", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>Informações Básicas</h4>

                  <div className="form-group">
                    <label>Título *</label>
                    <input type="text" value={editing.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Título chamativo do artigo" />
                  </div>

                  <div className="form-group">
                    <label>Subtítulo</label>
                    <input type="text" value={editing.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} placeholder="Subtítulo ou frase de apoio" />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label>Categoria *</label>
                      <select value={editing.category} onChange={(e) => updateField("category", e.target.value as Category)} style={{ padding: "0.75rem 1rem", border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "0.95rem", background: "white", cursor: "pointer" }}>
                        {Object.entries(categoryLabels).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Slug (URL) *</label>
                      <input type="text" value={editing.slug} onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))} placeholder="meu-artigo-aqui" />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label>Data de Publicação</label>
                      <input type="date" value={editing.publishedAt} onChange={(e) => updateField("publishedAt", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Tempo de Leitura (min)</label>
                      <input type="number" min={1} max={60} value={editing.readTime} onChange={(e) => updateField("readTime", Number(e.target.value))} />
                    </div>
                  </div>

                  {/* Cover */}
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "var(--sage-dark)", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginTop: "0.5rem" }}>Imagem de Capa</h4>
                  <div className="form-group">
                    <label>URL da Imagem *</label>
                    <input type="url" value={editing.coverImage} onChange={(e) => updateField("coverImage", e.target.value)} placeholder="https://images.unsplash.com/..." />
                  </div>
                  {editing.coverImage && (
                    <img src={editing.coverImage} alt="Prévia" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
                  )}
                  <div className="form-group">
                    <label>Alt Text da Imagem</label>
                    <input type="text" value={editing.coverAlt} onChange={(e) => updateField("coverAlt", e.target.value)} placeholder="Descrição da imagem" />
                  </div>

                  {/* Excerpt */}
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "var(--sage-dark)", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginTop: "0.5rem" }}>Resumo e Conteúdo</h4>
                  <div className="form-group">
                    <label>Resumo (excerpt) *</label>
                    <textarea value={editing.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} placeholder="Resumo que aparece nos cards e listas" rows={3} style={{ padding: "0.75rem 1rem", border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "0.95rem", resize: "vertical", outline: "none" }} />
                  </div>

                  <div className="form-group">
                    <label>Conteúdo (HTML) *</label>
                    <textarea value={editing.content} onChange={(e) => updateField("content", e.target.value)} placeholder="<p>Texto do artigo...</p><h2>Subtítulo</h2><p>...</p>" rows={16} style={{ padding: "0.75rem 1rem", border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)", fontFamily: "monospace", fontSize: "0.875rem", resize: "vertical", outline: "none", lineHeight: 1.6 }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>Use tags HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;</span>
                  </div>

                  {/* SEO */}
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "var(--sage-dark)", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", marginTop: "0.5rem" }}>SEO</h4>
                  <div className="form-group">
                    <label>Meta Title</label>
                    <input type="text" value={editing.metaTitle} onChange={(e) => updateField("metaTitle", e.target.value)} placeholder="Título SEO | Cozinha Mais Consciente" />
                  </div>
                  <div className="form-group">
                    <label>Meta Description</label>
                    <textarea value={editing.metaDescription} onChange={(e) => updateField("metaDescription", e.target.value)} placeholder="Descrição para buscadores (até 160 caracteres)" rows={2} style={{ padding: "0.75rem 1rem", border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "0.95rem", resize: "vertical", outline: "none" }} />
                    <span style={{ fontSize: "0.75rem", color: editing.metaDescription.length > 160 ? "#e53e3e" : "var(--gray-400)" }}>
                      {editing.metaDescription.length}/160 caracteres
                    </span>
                  </div>

                  <button onClick={handleSave} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                    💾 Salvar Artigo
                  </button>
                </div>
              </div>

              {/* Right: Preview */}
              {preview && (
                <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>
                  <div style={{ background: "var(--sage-dark)", color: "white", padding: "0.75rem 1rem", fontSize: "0.8rem", textAlign: "center", fontWeight: 600 }}>
                    📱 Pré-visualização do Artigo
                  </div>
                  {editing.coverImage && (
                    <img src={editing.coverImage} alt="" style={{ width: "100%", height: 200, objectFit: "cover" }} />
                  )}
                  <div style={{ padding: "1.5rem" }}>
                    <span className="badge">{editing.categoryLabel || categoryLabels[editing.category]}</span>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", margin: "0.75rem 0 0.5rem", lineHeight: 1.3 }}>{editing.title || "Título do artigo"}</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontStyle: "italic", marginBottom: "1rem" }}>{editing.subtitle}</p>
                    <div className="article-content" style={{ maxWidth: "none", fontSize: "0.9rem" }} dangerouslySetInnerHTML={{ __html: editing.content }} />
                    <ArticleCTA />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
