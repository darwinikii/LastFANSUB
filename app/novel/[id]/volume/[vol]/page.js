import dynamic from 'next/dynamic'
import fs from 'fs'
import path from 'path'

const ChapterList = dynamic(() => import('/components/ChapterList'))
const Nav = dynamic(() => import('/components/Nav'))
const DataSection = dynamic(() => import('/components/DataSection'))
const Markdown = dynamic(() => import('/components/MarkdownParse'))

export async function generateStaticParams() {
  if (!fs.existsSync(path.join(process.cwd(), "data", "novels"))) return []
  var params = [];
  var novels = fs.readdirSync(path.join(process.cwd(), "data", "novels")).sort(function (a, b) { return a - b })
  novels.forEach(novel => {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", novel, "volumes"))) return
    var volumes = fs.readdirSync(path.join(process.cwd(), "data", "bin", novel, "volumes")).sort(function (a, b) { return a - b })
    volumes.forEach(volume => {
      params.push({
        id: novel.id,
        vol: volume
      })
    })
  })


  return params
}

export default function Page({ params }) {
  return (
    <main className="w-full max-w-screen-2xl rounded-3xl m-16 flex flex-col items-center">
      <Nav className='flex w-11/12 justify-between bg-gray-950 rounded-3xl m-10 p-8 drop-shadow-xl' />

      <div className="flex flex-col justify-center w-11/12">
        <DataSection
          id={params.id}
          vol={params.vol}
          type={"novel"}
          className="flex p-5 w-full rounded-3xl drop-shadow-xl mb-10"
          style={{ backgroundColor: "#222" }}
        />

        <div className="flex flex-col p-5 w-full rounded-3xl drop-shadow-xl mb-10" style={{ backgroundColor: "#222" }}>
          <div className="flex w-full justify-center items-center text-3xl font-bold mb-5">
            <h1>Bölümler</h1>
          </div>
          <div className="flex flex-col list-disc ml-4 items-center">
            <ChapterList
              id={params.id}
              vol={params.vol}
              className="flex flex-col list-disc ml-4"
            />
          </div>
        </div>

        <div className="flex flex-col p-5 w-full rounded-3xl drop-shadow-xl mb-10" style={{ backgroundColor: "#222" }}>
          <div className="flex w-full justify-center items-center text-3xl font-bold mb-5">
            <h1>Özet</h1>
          </div>
          <div className="flex flex-col list-disc ml-4 items-center">
            <Markdown
              url={'/api/novel/' + params.id + '/volumes/' + params.vol}
              callback={"synopsis"}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
