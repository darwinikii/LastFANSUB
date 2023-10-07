import fs from 'fs'

export async function GET(req, { params }) {
    var volumes = fs.readdirSync("./data/" + params.id + "/volumes/")
    var chapters = fs.readdirSync("./data/" + params.id + "/volumes/" + volumes[0] + "/chapters/")

    return Response.redirect(req.nextUrl.origin + "/novel/" + params.id + "/volume/" + volumes[0] + "/chapter/" + chapters[0].split(".")[0])
}