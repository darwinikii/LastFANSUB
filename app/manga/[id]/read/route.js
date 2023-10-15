export async function GET(req, { params }) {
    try {
        var api = await fetch("https://lastfansub.vercel.app/api/manga/" + params.id + "/chapters")
        api = (await api.json())
    } catch (e) {
        return Response.redirect("https://lastfansub.vercel.app/not-found/")
    }
    

    return Response.redirect("https://lastfansub.vercel.app/manga/" + params.id + "/chapter/" + api.list[0].id)
}