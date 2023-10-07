import fs from "fs"

export async function GET(req, { params }) {
  var chapterList = []
  var basicList = []

  var volumes = fs.readdirSync("./data/" + params.id + "/volumes")

  volumes.forEach((volume) => {
    var chapters = fs.readdirSync("./data/" + params.id + "/volumes/" + volume + "/chapters")

    chapters.forEach((chapter) => {
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