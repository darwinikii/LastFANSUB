import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: "swap" })

export const metadata = {
  title: 'LastFANSUB',
  description: 'LastFANSUB olarak, en sevdiğiniz light novel’leri Türkçe’ye çeviriyoruz. Sitemizde, fantastik dünyaların kapılarını aralayacak, heyecan dolu maceralara atılacak ve unutulmaz karakterlerle tanışacaksınız. Her bir hikaye, özenle çevrilmiş ve okuyucularımızın zevkine sunulmuştur. LastFANSUB’da, her bir sayfanın sizi yeni bir dünyaya taşımasına izin verin.',
  keywords: ['Novel', 'Manga', 'Oku', 'Türkçe', 'last fansub', 'last', 'fansub', 'lastfansub', 'lastsub', 'Noveller', 'Okumak için Kitap', 'Light Novel', 'oku light novel', 'Light novel çeviri', 'Ücretsiz Kitap Online', 'Novels Online'],
  colorScheme: 'dark',
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://googleads.g.doubleclick.net"/>
        <Script id='gtag' async src="https://www.googletagmanager.com/gtag/js?id=G-6RL141V2EP"></Script>
        <Script id='gtag-script'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6RL141V2EP');
          `}
        </Script>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#000000"/>
        <link preload="true" rel="icon" href="/favicon.ico" sizes="any"/>
        <link rel="icon" href="/favicon.png" type="image/png"/>
        <link rel="icon" href="/favicon.jpg" type="image/jpg"/>
        <link rel="canonical" href="https://lastfansub.vercel.app/"></link>
        <meta name="google-adsense-account" content="ca-pub-3609867447779558"/>
        <meta name="google-site-verification" content="d2_4MWCSUycrRLTnBlWNXZHBV7ww97YS6vBy5PgDyxE" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3609867447779558" crossorigin="anonymous"></Script>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics/>
      </body>
    </html>
  )
}
