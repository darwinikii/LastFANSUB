import { notFound } from 'next/navigation'
import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  if (params.id == undefined) return
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "data.json"))) return notFound()
  var novel = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "data.json")))
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes"))) var volumes = []
  else var volumes = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "volumes")).filter(f => !f.startsWith('.'))

  volumes.sort(function(a, b){return a - b})

  novel["volumes"] = []
  volumes.forEach((e) => {
    var volume = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", e, "data.json")))

    novel["volumes"].push(volume)
  })

  return new Response(JSON.stringify(novel, null, 2))
}