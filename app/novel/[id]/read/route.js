export async function GET(req, { params }) {
    try {
        var api = await fetch("https://lastfansub.vercel.app/api/novel/" + params.id + "/volumes")
        api = (await api.json())
    } catch (e) {
        return Response.redirect("https://lastfansub.vercel.app/not-found/")
    }
    

    return Response.redirect("https://lastfansub.vercel.app/novel/" + params.id + "/volume/" + api.basicList[0].split("-")[0] + "/chapter/" + api.basicList[0].split("-")[1])
}