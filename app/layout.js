import { Analytics } from '@vercel/analytics/react';
import { Partytown } from '@builder.io/partytown/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script';
import { WebVitals } from '/components/WebVitals'

const inter = Inter({ subsets: ['latin'], display: "swap" })

export const metadata = {
  title: 'LastFANSUB',
  description: 'LastFANSUB olarak, en sevdiğiniz light novel’leri Türkçe’ye çeviriyoruz. Sitemizde, fantastik dünyaların kapılarını aralayacak, heyecan dolu maceralara atılacak ve unutulmaz karakterlerle tanışacaksınız. Her bir hikaye, özenle çevrilmiş ve okuyucularımızın zevkine sunulmuştur. LastFANSUB’da, her bir sayfanın sizi yeni bir dünyaya taşımasına izin verin.',
  keywords: ['Novel', 'Manga', 'Oku', 'Türkçe', 'last fansub', 'last', 'fansub', 'lastfansub', 'lastsub', 'Noveller', 'Okumak için Kitap', 'Light Novel', 'oku light novel', 'Light novel çeviri', 'Ücretsiz Kitap Online', 'Novels Online'],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'LastFANSUB',
    siteName: 'LastFANSUB',
    description: 'LastFANSUB olarak, en sevdiğiniz light novel’leri Türkçe’ye çeviriyoruz. Sitemizde, fantastik dünyaların kapılarını aralayacak, heyecan dolu maceralara atılacak ve unutulmaz karakterlerle tanışacaksınız. Her bir hikaye, özenle çevrilmiş ve okuyucularımızın zevkine sunulmuştur. LastFANSUB’da, her bir sayfanın sizi yeni bir dünyaya taşımasına izin verin.',
    url: 'https://lastfansub.vercel.app',
    type: 'website',
    images: [
      "/logo2.png"
    ]
  },
  metadataBase: new URL("https://lastfansub.vercel.app")
}

export const viewport = {
  themeColor: 'black'
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://googleads.g.doubleclick.net"/>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com/"></link>
        <Script id='gtag' async src="https://www.googletagmanager.com/gtag/js?id=G-6RL141V2EP" type="text/partytown"></Script>
        <Script id='gtag-script' type="text/partytown">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6RL141V2EP');
          `}
        </Script>
        <Partytown/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#000000"/>
        <link preload="true" rel="icon" href="/favicon.ico" sizes="any"/>
        <link rel="icon" href="/favicon.png" type="image/png"/>
        <link rel="icon" href="/favicon.jpg" type="image/jpg"/>
        <meta name="google-adsense-account" content="ca-pub-3609867447779558"/>
        <meta name="google-site-verification" content="d2_4MWCSUycrRLTnBlWNXZHBV7ww97YS6vBy5PgDyxE" />
        <meta name="yandex-verification" content="002567d7ff4d7034" />
        <Script strategy="lazyOnload" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3609867447779558" crossOrigin="anonymous"></Script>
        <SpeedInsights/>
      </head>
      <body className={inter.className + " flex justify-center w-full"} style={{backgroundColor: "#16151d"}}>
        <WebVitals/>
        {children}
        <Analytics/>
      </body>
    </html>
  )
}
