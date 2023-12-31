import { notFound } from 'next/navigation'
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

export async function GET(req, { params }) {
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "data.json"))) return notFound()
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "data.json"))) return notFound()
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters"))) {
    fs.mkdirSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters"))
  }
  var volumeData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "data.json")))
  var novelData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "data.json")))
  var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters")).filter(f => !f.startsWith('.')).sort((a, b) => b.split(".")[0] - a.split(".")[0])

  volumeData["chapterList"] = []
  volumeData["basicList"] = []
  chapters.forEach((chapter) => {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters", chapter))) return
    chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters", chapter)))

    if (chapter["override"]) volumeData["chapterList"].push(chapter.override + chapter.name)
    else volumeData["chapterList"].push("Bölüm " + chapter.id + " - " + chapter.name)
    volumeData["basicList"].push(params.vol + "-" + chapter.id)
  })

  
  volumeData["novelData"] = novelData
  return new Response(JSON.stringify(volumeData, null, 2))
}