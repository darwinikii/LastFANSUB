import fs from 'fs'

export async function GET(req, { params }) {
    var api = await fetch(req.nextUrl.origin + "/api/novel/" + params.id + "/volumes")
    api = (await api.json())

    return Response.redirect(req.nextUrl.origin + "/novel/" + params.id + "/volume/" + api.basicList[0].split("-")[0] + "/chapter/" + api.basicList[0].split("-")[1])
}