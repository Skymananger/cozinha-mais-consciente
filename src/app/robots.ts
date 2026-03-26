import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/editor/'],
    },
    sitemap: 'https://cozinhamaisconsciente.com.br/sitemap.xml',
  };
}
