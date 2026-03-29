export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/emergency/',
    },
    sitemap: 'https://sugarcare.in/sitemap.xml',
  };
}
