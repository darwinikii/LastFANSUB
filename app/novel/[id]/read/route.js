import Database from "@/src/Database"
const domain = "https://lastfansub.vercel.app/"

export function generateStaticParams() {
    return Database.novel.all().map(e => ({ "id": `${e}` }));
}

export async function GET(req, { params }) {
    if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.redirect(new URL("/not-found/", domain))
    const list = Database.novel.volume.all(params["id"])
    .map(volume => ({
        "id": volume,
        "chapters": Database.novel.chapter.all(parseFloat(params["id"]), volume)
    }))
    
    if (list.length > 0) return Response.redirect(new URL("/novel/" + params["id"] + "/volume/" + list[0]["id"] + "/chapter/" + list[0]["chapters"][0], domain))
    else return Response.redirect(new URL("/not-found/", domain))
}