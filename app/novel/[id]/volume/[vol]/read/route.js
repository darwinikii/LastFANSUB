import fs from 'fs'
import path from 'path'

export async function GET(req, { params }) {
    var chapters = fs.readdirSync(path.join(process.cwd(), "data", params.id, "volumes", params.vol, "chapters"))
    if (!chapters[0]) return Response.redirect("https://lastfansub.vercel.app/not-found/")

    return Response.redirect("https://lastfansub.vercel.app/novel/" + params.id + "/volume/" + params.vol + "/chapter/" + chapters[0].split(".")[0])
}