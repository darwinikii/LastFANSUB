import { notFound } from 'next/navigation'
import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  if (params.id == undefined) return
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "data.json"))) return notFound()
  var manga = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "data.json")))
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "chapters"))) var chapters = []
  else var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "chapters")).filter(f => !f.startsWith('.')).sort(function(a, b){return parseInt(a.split(".")[0]) - parseInt(b.split(".")[0])})

  manga["chapters"] = []
  chapters.forEach((e) => {
    var chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", e)))

    manga["chapters"].push(chapter)
  })

  return new Response(JSON.stringify(manga, null, 2))
}