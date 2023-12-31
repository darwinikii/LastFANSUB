import fs from "fs"
import path from "path";

export async function generateStaticParams() {
  if (!fs.existsSync(path.join(process.cwd(), "data", "mangas"))) return []
  var mangas = fs.readdirSync(path.join(process.cwd(), "data", "mangas")).sort(function(a, b){return a - b})

  return mangas.map(e => { id: e.id })
}

export async function GET(req, { params }) {
  var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "chapters")).filter(f => !f.startsWith('.')).sort((a, b) => parseFloat(a) - parseFloat(b))

  var list = chapters.map(chapter => {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", chapter)))
  }).filter(chap => chap["enabled"] != false)

  return new Response(JSON.stringify({list}, null, 2))
}