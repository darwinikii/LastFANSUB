import Link from 'next/link'
import dynamic from 'next/dynamic'
import fs from 'fs'
import path from 'path'

const Disqus = dynamic(() => import('/components/Disqus'))
const Nav = dynamic(() => import('/components/Nav'))
const VolumeList = dynamic(() => import('/components/VolumeList'))
const DataSection = dynamic(() => import('/components/DataSection'))
const Markdown = dynamic(() => import('/components/MarkdownParse'))

export async function generateMetadata({ params }) {
  try {
    var data = await (await fetch('https://lastfansub.vercel.app/api/novel/' + params.id)).json()

    var names = data.name.split(" ").length == 1 ? [data.name] : [...data.name.split(" "), data.name]
    if (data["fullName"] != "") names.push(data["fullName"])
    if (data["secName"] != "") names.push(data["secName"]) 

    return {
      title: "LastFANSUB - " + data.name,
      description: data.name + " novel oku. " + data.name + " ve daha fazla light noveli ve mangayı Türkçe bir şekilde LastFANSUB ile okuyabilirsiniz.",
      keywords: [...names, 'Novel', 'Manga', 'Oku', 'Türkçe', 'last fansub', 'last', 'fansub', 'lastfansub', 'lastsub', 'Noveller', 'Okumak için Kitap', 'Light Novel', 'oku light novel', 'Light novel çeviri', 'Ücretsiz Kitap Online', 'Novels Online'],
      colorScheme: 'dark',
      robots: {
        index: true,
        follow: true
      },
      openGraph: {
        title: "LastFANSUB - " + data.name,
        siteName: 'LastFANSUB',
        description: data.name + " novel oku. " + data.name + " ve daha fazla light noveli ve mangayı Türkçe bir şekilde LastFANSUB ile okuyabilirsiniz.",
        url: 'https://lastfansub.vercel.app/novel/' + data.id,
        type: 'website',
        images: [
          "/covers/" + data.shortname + "/main.jpg"
        ]
      },
      metadataBase: new URL("https://lastfansub.vercel.app")
    }
  } catch (e) {
    return {
      title: 'LastFANSUB',
      description: 'LastFANSUB olarak, en sevdiğiniz light novel’leri Türkçe’ye çeviriyoruz. Sitemizde, fantastik dünyaların kapılarını aralayacak, heyecan dolu maceralara atılacak ve unutulmaz karakterlerle tanışacaksınız. Her bir hikaye, özenle çevrilmiş ve okuyucularımızın zevkine sunulmuştur. LastFANSUB’da, her bir sayfanın sizi yeni bir dünyaya taşımasına izin verin.',
      keywords: ['Novel', 'Manga', 'Oku', 'Türkçe', 'last fansub', 'last', 'fansub', 'lastfansub', 'lastsub', 'Noveller', 'Okumak için Kitap', 'Light Novel', 'oku light novel', 'Light novel çeviri', 'Ücretsiz Kitap Online', 'Novels Online'],
      colorScheme: 'dark',
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
  }
}

async function getNovelData(params) {
  var data = await (await fetch("https://lastfansub.vercel.app/api/novel/" + params.id)).json();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    image: data.image,
    description: data.description,
    review: {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5,
        "bestRating": 5
      },
      "author": {
        "@type": "Person",
        "name": data.author.name
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export async function generateStaticParams() {
  if (!fs.existsSync(path.join(process.cwd(), "data", "novels"))) return []
  var novels = fs.readdirSync(path.join(process.cwd(), "data", "novels")).sort(function(a, b){return a - b})

  return novels.map(e => { id: e.id })
}

export default async function Page({ params }) {
  var data = await getNovelData(params);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 overflow-x-hidden">
      {data}
      <Nav className='left-0 top-0 z-10 w-full items-center justify-between font-mono text-sm lg:flex'/>

      <div className="rounded-xl w-full lg:max-w-4xl mt-4 flex border-gray-300 from-zinc-200 lg:pb-6 lg:pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px]">
        <DataSection
          id={params.id}
          type={"novel"}
        />
      </div>
      <div className="flex justify-center w-full mt-2">
            <Link
              href={"/novel/" + params.id + "/read"}
              className="flex justify-center block lg:hidden w-full inline-flex cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-neutral-800/30"
            >
              <h2 className={`text-2xl font-semibold`}>
                Oku{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </Link>
          </div>

      <h2 className="mt-10 mb-5 text-xl lg:text-4xl font-semibold">
        Açıklama
      </h2>
      <div className="max-w-4xl mb-10 p-4 w-full rounded-lg flex border-gray-300 from-zinc-200 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px]">
        <Markdown
          url={"/api/novel/" + params.id}
          callback="description"
        />
      </div> 
      <h2 className="mb-2 lg:mb-6 text-xl lg:text-4xl font-semibold">
        Ciltler
      </h2>
      <div className="mb-5 grid grid-cols-2 lg:grid-cols-4 border-gray-300 from-zinc-200 p-2 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit rounded-xl border bg-gray-200 bg-zinc-800/30">
        <VolumeList
          id={params.id}
        />
      </div>

      <div className="mt-10 w-full lg:max-w-4xl">
        <Disqus
          id={"n" + params.id}
        />
      </div>
    </main> 
  )
}
