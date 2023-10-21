import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
    if (!fs.existsSync(path.join(process.cwd(), "data", "mangas"))) return []
    var novels = fs.readdirSync(path.join(process.cwd(), "data", "mangas")).sort(function(a, b){return a - b})
  
    return novels.map(e => { id: e.id })
  }

export async function GET(req, { params }) {
    try {
        var api = await fetch("https://lastfansub.vercel.app/api/manga/" + params.id + "/chapters")
        api = (await api.json())
    } catch (e) {
        return Response.redirect("https://lastfansub.vercel.app/not-found/")
    }
    

    return Response.redirect("https://lastfansub.vercel.app/manga/" + params.id + "/chapter/" + api.list[0].id)
}