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
  var novels = fs.readdirSync(path.join(process.cwd(), "data", "novels")).sort(function (a, b) { return a - b })
  novels.forEach(novel => {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", novel, "volumes"))) return
    var volumes = fs.readdirSync(path.join(process.cwd(), "data", "bin", novel, "volumes")).sort(function (a, b) { return a - b })

    volumes.forEach(volume => {
      if (!fs.existsSync(path.join(process.cwd(), "data", "bin", novel, "volumes", volume, "chapters"))) return
      var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", novel, "volumes", volume, "chapters"), { withFileTypes: false }).map(e => e.split(".")[0]).sort(function (a, b) { return a - b })

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
    <main className="w-full max-w-screen-2xl rounded-3xl xl:m-16 flex flex-col items-center">
      <Nav className='flex flex-col xl:flex-row w-full xl:w-11/12 justify-between bg-gray-950 xl:rounded-3xl xl:m-10 p-8 drop-shadow-xl' />

      <div className="flex flex-col justify-center my-5 xl:m-16 w-11/12">
        <NovelControlBar
          id={params.id}
          vol={params.vol}
          chap={params.chap}
          className="hidden xl:flex justify-between items-center w-full relative rounded-3xl drop-shadow-xl p-5"
          style={{ backgroundColor: "#222" }}
        />
        <NovelControlBarMobile
          id={params.id}
          vol={params.vol}
          chap={params.chap}
          className="w-full xl:hidden rounded-3xl p-3"
          style={{ backgroundColor: "#222" }}
        />

        <div className='w-full my-5 xl:my-10 p-5 rounded-3xl text-lg' style={{ backgroundColor: "#222" }}>
          <MarkdownParse
            url={'/api/novel/' + params.id + "/volumes/" + params.vol + "/chapters/" + params.chap}
            callback="markdown"
          />
        </div>

        <NovelControlBarMobile
          id={params.id}
          vol={params.vol}
          chap={params.chap}
          className="w-full xl:hidden rounded-3xl p-3"
          style={{ backgroundColor: "#222" }}
        />

        <NovelControlBar
          id={params.id}
          vol={params.vol}
          chap={params.chap}
          className="hidden xl:flex justify-between items-center w-full relative rounded-3xl drop-shadow-xl p-5"
          style={{ backgroundColor: "#222" }}
        />

        <Disqus
          id={"n" + params.id + "v" + params.vol + "c" + params.chap}
          className="drop-shadow-xl rounded-3xl p-5 mt-10"
          style={{ backgroundColor: "#222"}}
        />
      </div>

    </main>
  )
}
