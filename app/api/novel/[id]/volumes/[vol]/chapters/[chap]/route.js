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
      if (!fs.existsSync(path.join(process.cwd(), "data", "bin", novel, "volumes", volume, "chapters"))) return
      var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", novel, "volumes", volume, "chapters"), { withFileTypes: false }).map(e => e.split(".")[0]).sort(function(a, b){return a - b})

      chapters.forEach(chapter => {
        params.push({
          id: novel,
          vol: volume,
          chap: chapter
        })
      })
    })
  })


  return params
}

export async function GET(req, { params }) {
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters", params.chap + ".json"))) return notFound()
  var chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters", params.chap + ".json")))

  return new Response(JSON.stringify(chapter, null, 2))
}