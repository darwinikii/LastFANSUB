import './style.css'
import dynamic from 'next/dynamic'
import fs from 'fs'
import path from 'path'

const Disqus = dynamic(() => import('/components/Disqus'))
const Nav = dynamic(() => import('/components/Nav'))
const NovelControlBar = dynamic(() => import('/components/NovelControlBar'))
const NovelControlBarMobile = dynamic(() => import('/components/NovelControlBarMobile'))
const MarkdownParse = dynamic(() => import('/components/MarkdownParse'))

export async function generateStaticParams() {
  if (!fs.existsSync(path.join(process.cwd(), "data", "novels"))) return []
  var params = [];
  var novels = fs.readdirSync(path.join(process.cwd(), "data", "novels")).sort(function(a, b){return a - b})
  novels.forEach(novel => {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", novel, "volumes"))) return
    var volumes = fs.readdirSync(path.join(process.cwd(), "data", "bin", novel, "volumes")).sort(function(a, b){return a - b})
    
    volumes.forEach(volume => {
      if (!fs.existsSync(path.join(process.cwd(), "data", "bin", novel, "volumes", volume, "chapters"))) return
      var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", novel, "volumes", volume, "chapters"), { withFileTypes: false }).map(e => e.split(".")[0]).sort(function(a, b){return a - b})

      chapters.forEach(chapter => {
        params.push({
          id: novel,
          vol: volume,
          chap: chapter
        })
      })
    })
  })


  return params
}

export default function Page({ params }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 overflow-hidden">
      <Nav className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'/>

      <div className="w-full lg:max-w-4xl mt-10 flex justify-around border-gray-300 before:-z-20 from-zinc-200 p-4 lg:pb-6 lg:pt-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static rounded-xl lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px]">
        <NovelControlBar
          id={params.id}
          vol={params.vol}
          chap={params.chap}
        />
      </div>
      <div className="block lg:hidden w-full mt-2 flex justify-around border-gray-300 before:-z-20 from-zinc-200 p-4 lg:pb-6 lg:pt-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static rounded-xl lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
          <NovelControlBarMobile
            id={params.id}
          />
      </div>

      <div className="max-w-4xl mt-10 mb-2 m-50 border-gray-300 from-zinc-200 p-2 lg:pb-6 lg:pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px]">
        <MarkdownParse
          url={'/api/novel/' + params.id + "/volumes/" + params.vol + "/chapters/" + params.chap}
          callback="markdown"
        />
      </div>

      <div className="w-full lg:max-w-4xl mt-2 flex justify-around border-gray-300 from-zinc-200 p-4 lg:pb-6 lg:pt-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static rounded-xl lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
        <NovelControlBar
          id={params.id}
          vol={params.vol}
          chap={params.chap}
        />
      </div>
      <div className="block lg:hidden w-full mt-2 flex justify-around border-gray-300 from-zinc-200 p-4 lg:pb-6 lg:pt-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static rounded-xl lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
        <NovelControlBarMobile
          id={params.id}
        />
      </div>

      <div className="mt-10 w-full lg:max-w-4xl">
        <Disqus
          id={"n" + params.id + "v" + params.vol + "c" + params.chap}
        />
      </div>
    </main>
  )
}
