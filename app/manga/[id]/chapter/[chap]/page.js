import dynamic from 'next/dynamic'
import fs from 'fs'
import path from 'path'

const Disqus = dynamic(() => import('/components/Disqus'))
const Nav = dynamic(() => import('/components/Nav'))
const MangaControlBar = dynamic(() => import('/components/MangaControlBar'))
const MangaControlBarMobile = dynamic(() => import('/components/MangaControlBarMobile'))
const MangaReader = dynamic(() => import('/components/MangaReader'))

export async function generateStaticParams() {
  if (!fs.existsSync(path.join(process.cwd(), "data", "mangas"))) return []
  var params = [];
  var mangas = fs.readdirSync(path.join(process.cwd(), "data", "mangas")).sort(function(a, b){return a - b})
  mangas.forEach(manga => {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", manga, "chapters"))) return
    var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", manga, "chapters")).sort(function(a, b){return a - b})
    chapters.forEach(chapter => {
      params.push({
        id: manga.id,
        chap: chapter
      })
    })
  })


  return params
}

export default function Page({ params }) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 overflow-hidden">
      <Nav className='z-10 w-full xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-lg w-full items-center justify-between font-mono text-sm lg:flex'/>

      <div className="w-full xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-lg mt-10 flex justify-around border-gray-300 before:-z-20 from-zinc-200 p-4 lg:pb-6 lg:pt-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static rounded-xl lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px]">
        <MangaControlBar
            id={params.id}
            chap={params.chap}
        />
      </div>
      <div className="block lg:hidden w-full mt-2 flex justify-around border-gray-300 before:-z-20 from-zinc-200 p-4 lg:pb-6 lg:pt-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static rounded-xl lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
          <MangaControlBarMobile
            id={params.id}
          />
      </div>

      <div className="w-full xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-lg mt-10 mb-2 border-gray-300 from-zinc-200 p-2 lg:pb-6 lg:pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
        <MangaReader
            id={params.id}
            chap={params.chap}
        />
      </div>

      <div className="w-full xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-lg w-full lg:max-w-4xl mt-2 flex justify-around border-gray-300 from-zinc-200 p-4 lg:pb-6 lg:pt-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static rounded-xl lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
        <MangaControlBar
            id={params.id}
            chap={params.chap}
        />
      </div>
      <div className="block lg:hidden w-full mt-2 flex justify-around border-gray-300 from-zinc-200 p-4 lg:pb-6 lg:pt-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static rounded-xl lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
        <MangaControlBarMobile
            id={params.id}
        />
      </div>

      <div className="w-full xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-lg mt-10 w-full rounded-xl lg:max-w-4xl">
        <Disqus
          id={"m" + params.id + "c" + params.chap}
        />
      </div>
    </main>
  )
}