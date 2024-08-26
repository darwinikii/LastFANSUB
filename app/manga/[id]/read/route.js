import Database from "@/src/Database"
const domain = "https://lastfansub.vercel.app/"

export async function generateStaticParams() {
    return Database.manga.all().map(e => ({ "id": `${e}` }));
  }

export async function GET(req, { params }) {
    if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.redirect(new URL("/not-found/", domain))
    var list = Database.manga.chapter.all(parseFloat(params["id"]))
        .map(chapter => Database.manga.chapter.get(parseFloat(params["id"]), chapter))

    if (list[0]) return Response.redirect(new URL("/manga/" + params["id"] + "/chapter/" + list[0]["id"], domain))
    else return Response.redirect(new URL("/not-found/", domain))
}