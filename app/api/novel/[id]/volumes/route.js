import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  var chapterList = []
  var basicList = []

  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes"))) {
    fs.mkdirSync(path.join(process.cwd(), "data", "bin", params.id, "volumes"))
  }
  var volumes = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "volumes")).filter(f => !f.startsWith('.'))
  volumes.sort(function(a, b){return a - b})

  volumes.forEach((volume) => {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", volume, "chapters"))) return
    var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", volume, "chapters")).filter(f => !f.startsWith('.'))

    chapters.forEach((chapter) => {
        if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", volume, "chapters", chapter))) return
        chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", volume, "chapters", chapter)))

        chapterList.push("Cilt " + volume + " Bölüm " + chapter.id + " - " + chapter.name)
        basicList.push(volume + "-" + chapter.id)
    })
  })

  return new Response(JSON.stringify({
    basicList,
    chapterList
  }, null, 2))
}