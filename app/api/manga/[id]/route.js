import { notFound } from 'next/navigation'
import fs from "fs"
import path from "path";

export async function generateStaticParams() {
  if (!fs.existsSync(path.join(process.cwd(), "data", "mangas"))) return []
  var mangas = fs.readdirSync(path.join(process.cwd(), "data", "mangas")).sort(function(a, b){return a - b})

  return mangas.map(e => { id: e.id })
}

export async function GET(req, { params }) {
  if (params.id == undefined) return
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "data.json"))) return notFound()
  var manga = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "data.json")))
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "chapters"))) var chapters = []
  else var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "chapters")).filter(f => !f.startsWith('.')).sort((a, b) => parseFloat(a) - parseFloat(b))

  manga["chapters"] = []
  chapters.reverse().forEach((e) => {
    var chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", e)))
    if (chapter["enabled"] == false) return

    manga["chapters"].push(chapter)
  })

  return new Response(JSON.stringify(manga, null, 2))
}