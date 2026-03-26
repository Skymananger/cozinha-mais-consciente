import { defaultArticles } from "@/lib/articles";

export default function sitemap() {
  const baseUrl = "https://cozinhamaisconsciente.com.br";

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/categoria/panelas-e-saude`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/categoria/alimentacao-consciente`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/categoria/contaminacao`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/categoria/dicas-da-cozinha`, lastModified: new Date(), priority: 0.8 },
  ];

  const articleRoutes = defaultArticles
    .filter(a => a.status === 'Publicado')
    .map((article) => ({
      url: `${baseUrl}/artigo/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      priority: 0.9,
    }));

  return [...staticRoutes, ...articleRoutes];
}
