import fs from "fs"

export async function GET(request, { params }) {
  var chapterList = []
  var basicList = []

  var chapters = fs.readdirSync("./data/" + params.id + "/volumes/" + params.vol)

  chapters.forEach((chapter) => {
    chapter = JSON.parse(fs.readFileSync("./data/" + params.id + "/volumes/" + params.vol + "/" + chapter))

    chapterList.push("Volume " + params.vol + " Chapter " + chapter.id + " - " + chapter.name)
    basicList.push(params.vol + "-" + chapter.id)
  })

  return new Response(JSON.stringify({
    basicList,
    chapterList
  }, null, 2))
}