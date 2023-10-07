import fs from 'fs'

export async function GET(req, { params }) {
    console.log("./data/" + params.id + "/volumes/" + params.vol + "/chapters/")
    var chapters = fs.readdirSync("./data/" + params.id + "/volumes/" + params.vol + "/chapters/")

    return Response.redirect(req.nextUrl.origin + "/novel/" + params.id + "/volume/" + params.vol + "/chapter/" + chapters[0].split(".")[0])
}