import { notFound } from 'next/navigation'
import fs from "fs"
import path from "path";

export async function GET(request, { params }) {
  var chapterList = []
  var basicList = []

  if (!fs.existsSync(path.join(process.cwd(), "data", params.id, "volumes", params.vol, "chapters"))) return notFound()
  var chapters = fs.readdirSync(path.join(process.cwd(), "data", params.id, "volumes", params.vol, "chapters")).filter(f => !f.startsWith('.'))

  chapters.forEach((chapter) => {
    if (!fs.existsSync(path.join(process.cwd(), "data", params.id, "volumes", params.vol, "chapters", chapter))) return
    chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", params.id, "volumes", params.vol, "chapters", chapter)))

    chapterList.push("Volume " + params.vol + " Chapter " + chapter.id + " - " + chapter.name)
    basicList.push(params.vol + "-" + chapter.id)
  })

  return new Response(JSON.stringify({
    basicList,
    chapterList
  }, null, 2))
}