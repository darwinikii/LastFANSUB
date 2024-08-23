import fs from 'fs'
import path from 'path'

const domain = "https://lastfansub.vercel.app/"

export async function generateStaticParams() {
    if (!fs.existsSync(path.join(process.cwd(), "data", "novels"))) return []
    var novels = fs.readdirSync(path.join(process.cwd(), "data", "novels")).sort(function (a, b) { return a - b })

    return novels.map(e => { id: e.id })
}

export async function GET(req, { params }) {
    var chapterList = []
    var basicList = []

    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id))) return Response.redirect(new URL("/not-found/", domain))
    if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes"))) return Response.redirect(new URL("/not-found/", domain))
    var volumes = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "volumes")).filter(f => !f.startsWith('.')).sort(function (a, b) { return b - a; });

    volumes.forEach((volume) => {
        if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", volume, "chapters"))) return
        var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", volume, "chapters"))
            .filter(f => !f.startsWith('.'))
            .sort((a, b) => a.split(".")[0] - b.split(".")[0])

        chapters.forEach((chapter) => {
            if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", volume, "chapters", chapter))) return
            chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", volume, "chapters", chapter)))

            if (chapter["override"]) chapterList.push(chapter.override + chapter.name)
            else chapterList.push("Cilt " + volume + " Bölüm " + chapter.id + " - " + chapter.name)
            basicList.push(volume + "-" + chapter.id)
        })
    })

    if (basicList[0]) return Response.redirect(new URL("/novel/" + params.id + "/volume/" + basicList[0].split("-")[0] + "/chapter/" + basicList[0].split("-")[1], domain))
    else return Response.redirect(new URL("/not-found/", domain))
}