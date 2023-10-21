import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
    if (!fs.existsSync(path.join(process.cwd(), "data", "novels"))) return []
    var novels = fs.readdirSync(path.join(process.cwd(), "data", "novels")).sort(function(a, b){return a - b})
  
    return novels.map(e => { id: e.id })
  }

export async function GET(req, { params }) {
    try {
        var api = await fetch("https://lastfansub.vercel.app/api/novel/" + params.id + "/volumes")
        api = (await api.json())
    } catch (e) {
        return Response.redirect("https://lastfansub.vercel.app/not-found/")
    }
    

    return Response.redirect("https://lastfansub.vercel.app/novel/" + params.id + "/volume/" + api.basicList[0].split("-")[0] + "/chapter/" + api.basicList[0].split("-")[1])
}