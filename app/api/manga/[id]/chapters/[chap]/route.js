import fs from "fs"
import path from "path";

export async function generateStaticParams() {
  if (!fs.existsSync(path.join(process.cwd(), "data", "mangas"))) return []
  var params = [];
  var mangas = fs.readdirSync(path.join(process.cwd(), "data", "mangas")).sort(function(a, b){return a - b})
  mangas.forEach(manga => {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", manga, "chapters"))) return
    var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", manga, "chapters")).sort(function(a, b){return a - b})
    chapters.forEach(chapter => {
      params.push({
        id: manga.id,
        chap: chapter
      })
    })
  })


  return params
}

export async function GET(req, { params }) {
  var chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", params.chap + ".json")))

  return new Response(JSON.stringify(chapter, null, 2))
}