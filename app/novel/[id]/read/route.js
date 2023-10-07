export async function GET(req, { params }) {
    try {
        var api = await fetch("http://lastfansub.repl.co/api/novel/" + params.id + "/volumes")
        api = (await api.json())
    } catch (e) {
        return Response.redirect("http://lastfansub.repl.co/not-found/")
    }
    

    return Response.redirect("http://lastfansub.repl.co/novel/" + params.id + "/volume/" + api.basicList[0].split("-")[0] + "/chapter/" + api.basicList[0].split("-")[1])
}