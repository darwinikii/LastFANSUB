import fs from "fs"

export async function GET(req, { params }) {
  var volumeData = JSON.parse(fs.readFileSync("./data/" + params.id + "/volumes/" + params.vol + "/data.json"))
  var novelData = JSON.parse(fs.readFileSync("./data/" + params.id + "/data.json"))
  var chapters = fs.readdirSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/")

  volumeData["chapterList"] = []
  volumeData["basicList"] = []
  chapters.forEach((chapter) => {
    chapter = JSON.parse(fs.readFileSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/" + chapter))

    volumeData["chapterList"].push("Bölüm " + chapter.id + " - " + chapter.name)
    volumeData["basicList"].push(params.vol + "-" + chapter.id)
  })

  
  volumeData["novelData"] = novelData
  return new Response(JSON.stringify(volumeData, null, 2))
}