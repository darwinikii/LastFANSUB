import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], preload: true })

export async function generateMetadata({ params }) {
    var data = await (await fetch('https://lastfansub.repl.co/api/novel/' + params.id)).json()
    
    return {
      title: "LastFANSUB - " + data.name,
      description: data.name + " novel oku. " + data.name + " ve daha fazla light noveli Türkçe bir şekilde LastFANSUB ile okuyabilirsiniz.",
      keywords: [...data.name.split(" "), data.name, 'Novel', 'Oku', 'Türkçe', 'Manga', 'last', 'fansub', 'lastfansub', 'lastsub'],
      colorScheme: 'dark',
      robots: {
        index: true
      }
    }
  }

  export default function RootLayout({ children }) {
    return (
      <html lang="tr">
        <head>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="theme-color" content="#000000"/>
          <link rel="icon" href="favicon.ico" sizes="any" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="google-adsense-account" content="ca-pub-3609867447779558" />
          <meta name="google-site-verification" content="rS61IrS8r6xk8N1OU20FhT3FY1ksROaOjRxdhfO4xo8" />
          <Script id="google-analytics">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-QHVGPV4XV6');
          `}
          </Script>
          <Script preload='false' async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3609867447779558' crossOrigin='anonymous'></Script>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    )
  }
