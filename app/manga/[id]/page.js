import dynamic from 'next/dynamic'
import Database from '@/src/Database'

const Disqus = dynamic(() => import('/components/Disqus'))
const Nav = dynamic(() => import('/components/Nav'))
const ChapterSectionList = dynamic(() => import('/components/ChapterSectionList'))
const DataSection = dynamic(() => import('/components/DataSection'))
const Markdown = dynamic(() => import('/components/MarkdownParse'))
const Breadcrumb = dynamic(() => import('/components/Breadcrumb'))

export async function generateMetadata({ params }) {
  try {
    if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) throw new Error("Invalid ID")
    const data = Database.get(parseFloat(params["id"]))

    return {
      title: "LastFANSUB - " + data["names"][0],
      description: data["names"][0] + " Manga oku. " + data["names"][0] + " ve daha fazla light noveli ve mangayı Türkçe bir şekilde LastFANSUB ile okuyabilirsiniz.",
      keywords: [...data["names"], 'Novel', 'Manga', 'Oku', 'Türkçe', 'last fansub', 'last', 'fansub', 'lastfansub', 'lastsub', 'Noveller', 'Okumak için Kitap', 'Light Novel', 'oku light novel', 'Light novel çeviri', 'Ücretsiz Kitap Online', 'Novels Online'],
      robots: {
        index: true,
        follow: true
      },
      openGraph: {
        title: "LastFANSUB - " + data["names"][0],
        siteName: 'LastFANSUB',
        description: data["names"][0] + " Manga oku. " + data["names"][0] + " ve daha fazla light noveli ve mangayı Türkçe bir şekilde LastFANSUB ile okuyabilirsiniz.",
        url: 'https://lastfansub.vercel.app/manga/' + data.id,
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

export const viewport = {
  themeColor: 'black'
}

export async function generateStaticParams() {
  return Database.manga.all().map(e => ({ "id": `${e}` }));
}

export default async function Page({ params }) {
  return (
    <main className="w-full max-w-screen-2xl rounded-3xl xl:m-16 flex flex-col items-center">
      <Breadcrumb
       id={params["id"]}
       type={"manga"}
      />
      <Nav className='flex flex-col xl:flex-row w-full xl:w-11/12 justify-between bg-gray-950 xl:rounded-3xl xl:m-10 p-8 drop-shadow-xl' />

      <div className="flex flex-col justify-center my-5 w-11/12">
        <DataSection
          id={params.id}
          type="manga"
          className="ease-out duration-300 flex flex-col xl:flex-row p-5 w-full rounded-3xl drop-shadow-xl items-center mb-10"
          style={{ backgroundColor: "#222" }}
        />

        <div className="flex flex-col p-5 w-full rounded-3xl drop-shadow-xl mb-10" style={{ backgroundColor: "#222" }}>
          <div className="flex w-full justify-center items-center text-3xl font-bold mb-5">
            <h1>Açıklama</h1>
          </div>
          <div>
            <Markdown
              url={"/api/manga/" + params.id}
              callback="description"
            />
          </div>
        </div>

        <div className="flex flex-col p-5 w-full rounded-3xl drop-shadow-xl mb-10" style={{ backgroundColor: "#222" }}>
          <div className="flex w-full justify-center items-center text-3xl font-bold mb-5">
            <h1>Bölümler</h1>
          </div>
          <ChapterSectionList
            id={params.id}
            className=""
          />
        </div>

        <Disqus
          id={"m" + params.id}
          className="drop-shadow-xl rounded-3xl p-5"
          style={{ backgroundColor: "#222" }}
        />
      </div>
    </main>
  )
}
