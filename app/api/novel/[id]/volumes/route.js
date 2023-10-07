import { notFound } from 'next/navigation'
import fs from "fs"

export async function GET(req, { params }) {
  var chapterList = []
  var basicList = []

  if (!fs.existsSync("./data/" + params.id + "/volumes")) return notFound()
  var volumes = fs.readdirSync("./data/" + params.id + "/volumes")
  volumes.sort(function(a, b){return a - b})

  volumes.forEach((volume) => {
    if (!fs.existsSync("./data/" + params.id + "/volumes/" + volume + "/chapters")) return
    var chapters = fs.readdirSync("./data/" + params.id + "/volumes/" + volume + "/chapters")

    chapters.forEach((chapter) => {
        if (!fs.existsSync("./data/" + params.id + "/volumes/" + volume + "/chapters/" + chapter)) return
        chapter = JSON.parse(fs.readFileSync("./data/" + params.id + "/volumes/" + volume + "/chapters/" + chapter))

        chapterList.push("Cilt " + volume + " Bölüm " + chapter.id + " - " + chapter.name)
        basicList.push(volume + "-" + chapter.id)
    })
  })

  return new Response(JSON.stringify({
    basicList,
    chapterList
  }, null, 2))
}