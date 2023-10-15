export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://lastfansub.vercel.app/sitemap.xml',
      host: 'https://lastfansub.vercel.app/'
    }
  }