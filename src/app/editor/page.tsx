import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { defaultArticles } from "@/lib/articles";

export const metadata = {
  title: 'Editor | Cozinha Mais Consciente',
  robots: { index: false, follow: false }
}

export default async function EditorDashboard() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("editor_auth");

  if (!authCookie || authCookie.value !== "authenticated") {
    redirect("/editor/login");
  }

  // Sort articles by publishedAt date ascending
  const sortedArticles = [...defaultArticles].sort((a, b) => 
    new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publicado': return { bg: '#DEF7EC', text: '#03543F' };
      case 'A Publicar': return { bg: '#E1EFFE', text: '#1E429F' };
      case 'Em Produção': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Em Revisão': return { bg: '#FDE8E8', text: '#9B1C1C' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <div className="section" style={{ minHeight: "calc(100vh - 60px)" }}>
      <div className="container">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Calendário Editorial</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              Total de {sortedArticles.length} artigos no planejamento.
            </p>
          </div>
        </header>

        <div style={{ background: "var(--white)", borderRadius: "var(--radius)", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ background: "var(--sage-pale)", color: "var(--sage-dark)", borderBottom: "1px solid var(--border-light)" }}>
                <tr>
                  <th style={{ padding: "1.5rem", fontWeight: 600 }}>Data Prevista</th>
                  <th style={{ padding: "1.5rem", fontWeight: 600 }}>Artigo</th>
                  <th style={{ padding: "1.5rem", fontWeight: 600 }}>Universo / Categoria</th>
                  <th style={{ padding: "1.5rem", fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedArticles.map((article) => {
                  const statusColors = getStatusColor(article.status);
                  const isPast = new Date(article.publishedAt).getTime() < new Date().getTime() && article.status !== 'Publicado';

                  return (
                    <tr key={article.id} style={{ borderBottom: "1px solid var(--border-light)", transition: "background 0.2s" }}>
                      <td style={{ padding: "1.5rem", whiteSpace: "nowrap", color: isPast ? "#9B1C1C" : "inherit" }}>
                        {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                        {isPast && <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 600 }}>Atrasado</span>}
                      </td>
                      <td style={{ padding: "1.5rem" }}>
                        <div style={{ fontWeight: 600, color: "var(--gray-800)", marginBottom: "0.25rem" }}>
                          {article.title}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                          Slug: /{article.slug}
                        </div>
                      </td>
                      <td style={{ padding: "1.5rem", whiteSpace: "nowrap" }}>
                        <div style={{ marginBottom: "0.25rem" }}>
                          <span style={{ textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", color: "var(--text-light)" }}>
                            {article.universe}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.9rem" }}>
                          {article.categoryLabel}
                        </div>
                      </td>
                      <td style={{ padding: "1.5rem", whiteSpace: "nowrap" }}>
                        <span style={{ 
                          display: "inline-block", 
                          padding: "0.25rem 0.75rem", 
                          borderRadius: "999px", 
                          fontSize: "0.85rem", 
                          fontWeight: 600,
                          background: statusColors.bg,
                          color: statusColors.text
                        }}>
                          {article.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
