import dynamic from 'next/dynamic'
import Database from '@/src/Database'

const Disqus = dynamic(() => import('/components/Disqus'))
const Nav = dynamic(() => import('/components/Nav'))
const MangaControlBar = dynamic(() => import('/components/MangaControlBar'))
const MangaControlBarMobile = dynamic(() => import('/components/MangaControlBarMobile'))
const MangaReader = dynamic(() => import('/components/MangaReader'))

export async function generateStaticParams() {
  var params = []
  const series = Database.manga.all()
    .map(e => ({
      "id": e,
      "chapters": Database.manga.chapter.all(e)
    }))

  series.forEach((serie) => {
    serie["chapters"].forEach((chapter) => {
      params.push({
        "id": `${serie["id"]}`,
        "chap": `${chapter}`
      })
    });
  });

  return params
}

export default function Page({ params }) {

  return (
    <main className="w-full max-w-screen-2xl rounded-3xl xl:m-16 flex flex-col items-center">
      <Nav className='flex flex-col xl:flex-row w-full xl:w-11/12 justify-between bg-gray-950 xl:rounded-3xl xl:m-10 p-8 drop-shadow-xl' />

      <div className="flex flex-col justify-center my-5 xl:m-16 w-11/12">
        <MangaControlBar
          id={params.id}
          chap={params.chap}
          className="hidden xl:flex justify-between items-center w-full relative rounded-3xl drop-shadow-xl p-5"
          style={{ backgroundColor: "#222" }}
        />
        <MangaControlBarMobile
          id={params.id}
          chap={params.chap}
          className="block xl:hidden w-full p-3 rounded-3xl"
          style={{ backgroundColor: "#222" }}
        />

        <MangaReader
          id={params.id}
          chap={params.chap}
          className="flex justify-center items-center w-full rounded-3xl drop-shadow-xl my-5 xl:my-10"
        />

        <MangaControlBarMobile
          id={params.id}
          chap={params.chap}
          className="block xl:hidden w-full p-3 rounded-3xl"
          style={{ backgroundColor: "#222" }}
        />
        <MangaControlBar
          id={params.id}
          chap={params.chap}
          className="hidden xl:flex justify-between items-center w-full relative rounded-3xl drop-shadow-xl p-5"
          style={{ backgroundColor: "#222" }}
        />

        <Disqus
          id={"m" + params.id + "c" + params.chap}
          className="drop-shadow-xl rounded-3xl p-5 mt-10"
          style={{ backgroundColor: "#222" }}
        />
      </div>
    </main>
  )
}