import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LastFANSUB',
  description: 'Novel çeviriyoruz',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta name="google-adsense-account" content="ca-pub-3609867447779558"/>
        <meta name="google-site-verification" content="rS61IrS8r6xk8N1OU20FhT3FY1ksROaOjRxdhfO4xo8" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QHVGPV4XV6"></Script>
        <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-QHVGPV4XV6');
        `}
        </Script>
        <Script id="google-smth">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TM8MK24C');`}</Script>
        <Script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3609867447779558' crossOrigin='anonymous'></Script>
      </head>
      <body className={inter.className}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TM8MK24C" height="0" width="0" className='hidden'></iframe></noscript>
        {children}
      </body>
    </html>
  )
}
