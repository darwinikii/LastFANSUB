import fs from 'fs';
import path from 'path';

const domain = "https://lastfansub.vercel.app/"

export async function generateStaticParams() {
    if (!fs.existsSync(path.join(process.cwd(), "data", "mangas"))) return []
    var novels = fs.readdirSync(path.join(process.cwd(), "data", "mangas")).sort(function (a, b) { return a - b })

    return novels.map(e => { id: e.id })
}

export async function GET(req, { params }) {
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id))) return Response.redirect(new URL("/not-found/", domain))
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "chapters"))) return Response.redirect(new URL("/not-found/", domain))
    var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "chapters"))
        .filter(f => !f.startsWith('.'))
        .sort((a, b) => parseFloat(a) - parseFloat(b))

    var list = chapters
        .map(chapter => JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", chapter))))
        .filter(chap => chap["enabled"] != false)

    if (list[0]) return Response.redirect(new URL("/manga/" + params.id + "/chapter/" + list[0].id, domain))
    else return Response.redirect(new URL("/not-found/", domain))
}