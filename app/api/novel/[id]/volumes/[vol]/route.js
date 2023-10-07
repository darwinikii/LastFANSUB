import { notFound } from 'next/navigation'
import fs from "fs"

export async function GET(req, { params }) {
  if (!fs.existsSync("./data/" + params.id + "/volumes/" + params.vol + "/data.json")) return notFound()
  if (!fs.existsSync("./data/" + params.id + "/data.json")) return notFound()
  if (!fs.existsSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/")) return notFound()
  var volumeData = JSON.parse(fs.readFileSync("./data/" + params.id + "/volumes/" + params.vol + "/data.json"))
  var novelData = JSON.parse(fs.readFileSync("./data/" + params.id + "/data.json"))
  var chapters = fs.readdirSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/")

  volumeData["chapterList"] = []
  volumeData["basicList"] = []
  chapters.forEach((chapter) => {
    if (!fs.existsSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/" + chapter)) return
    chapter = JSON.parse(fs.readFileSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/" + chapter))

    volumeData["chapterList"].push("Bölüm " + chapter.id + " - " + chapter.name)
    volumeData["basicList"].push(params.vol + "-" + chapter.id)
  })

  
  volumeData["novelData"] = novelData
  return new Response(JSON.stringify(volumeData, null, 2))
}