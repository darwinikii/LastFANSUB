import fs from 'fs'

export async function GET(req, { params }) {
    var chapters = fs.readdirSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/")
    if (!chapters[0]) return Response.redirect("http://lastfansub.repl.co/not-found/")

    return Response.redirect("https://lastfansub.repl.co/novel/" + params.id + "/volume/" + params.vol + "/chapter/" + chapters[0].split(".")[0])
}