import fs from 'fs'
import path from 'path'

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
    var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters"))
    if (!chapters[0]) return Response.redirect("https://lastfansub.vercel.app/not-found/")

    return Response.redirect("https://lastfansub.vercel.app/novel/" + params.id + "/volume/" + params.vol + "/chapter/" + chapters[0].split(".")[0])
}