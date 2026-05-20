import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://narratorhq.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/clients/', '/reports/', '/settings/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
