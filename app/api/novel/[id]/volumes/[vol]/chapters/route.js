import { notFound } from 'next/navigation'
import fs from "fs"

export async function GET(request, { params }) {
  var chapterList = []
  var basicList = []

  if (!fs.existsSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/")) return notFound()
  var chapters = fs.readdirSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/")

  chapters.forEach((chapter) => {
    if (!fs.existsSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/" + chapter)) return
    chapter = JSON.parse(fs.readFileSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/" + chapter))

    chapterList.push("Volume " + params.vol + " Chapter " + chapter.id + " - " + chapter.name)
    basicList.push(params.vol + "-" + chapter.id)
  })

  return new Response(JSON.stringify({
    basicList,
    chapterList
  }, null, 2))
}