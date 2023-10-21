import fs from "fs"
import path from "path";

export async function generateStaticParams() {
  if (!fs.existsSync(path.join(process.cwd(), "data", "novels"))) return []
  var params = [];
  var novels = fs.readdirSync(path.join(process.cwd(), "data", "novels")).sort(function(a, b){return a - b})
  novels.forEach(novel => {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", novel, "volumes"))) return
    var volumes = fs.readdirSync(path.join(process.cwd(), "data", "bin", novel, "volumes")).sort(function(a, b){return a - b})
    volumes.forEach(volume => {
      params.push({
        id: novel.id,
        vol: volume
      })
    })
  })


  return params
}

export async function GET(request, { params }) {
  var chapterList = []
  var basicList = []

  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", "bin", params.id, "volumes", params.vol, "chapters"))) {
    fs.mkdirSync(path.join(process.cwd(), "data", "bin", "bin", params.id, "volumes", params.vol, "chapters"))
  }
  var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", "bin", params.id, "volumes", params.vol, "chapters")).filter(f => !f.startsWith('.'))

  chapters.forEach((chapter) => {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", "bin", params.id, "volumes", params.vol, "chapters", chapter))) return
    chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", "bin", params.id, "volumes", params.vol, "chapters", chapter)))

    chapterList.push("Volume " + params.vol + " Chapter " + chapter.id + " - " + chapter.name)
    basicList.push(params.vol + "-" + chapter.id)
  })

  return new Response(JSON.stringify({
    basicList,
    chapterList
  }, null, 2))
}