export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <header style={{ background: "var(--white)", borderBottom: "1px solid var(--border-light)", padding: "1rem" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.2rem", color: "var(--sage-dark)", margin: 0 }}>Cozinha Mais Consciente | Editor</h1>
          <a href="/" style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>← Voltar ao site</a>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
