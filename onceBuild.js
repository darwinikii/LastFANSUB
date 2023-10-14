const fs = require('fs')
const fse = require('fs-extra');
const path = require('path')

var isMangasFolder = fs.existsSync(path.join(process.cwd(), "data", "mangas"))
var isNovelsFolder = fs.existsSync(path.join(process.cwd(), "data", "novels"))
var isTagsFolder = fs.existsSync(path.join(process.cwd(), "data", "tags"))
var isPagesFolder = fs.existsSync(path.join(process.cwd(), "public", "pages"))

if (!isMangasFolder) fs.mkdirSync(path.join(process.cwd(), "data", "mangas"))
else fse.emptyDirSync(path.join(process.cwd(), "data", "mangas"))
if (!isNovelsFolder) fs.mkdirSync(path.join(process.cwd(), "data", "novels"))
else fse.emptyDirSync(path.join(process.cwd(), "data", "novels"))
if (!isTagsFolder) fs.mkdirSync(path.join(process.cwd(), "data", "tags"))
else fse.emptyDirSync(path.join(process.cwd(), "data", "tags"))
if (!isPagesFolder) fs.mkdirSync(path.join(process.cwd(), "public", "pages"))
else fse.emptyDirSync(path.join(process.cwd(), "public", "pages"))

var series = fs.readdirSync(path.join(process.cwd(), "data", "bin")).map(e => fs.existsSync(path.join(process.cwd(), "data", "bin", e, "data.json")) ? JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", e, "data.json"))) : false )

for (serie of series) {
    if (serie["type"] == "Novel") {
        if (fs.existsSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()), { recursive: true, force: true })
        fs.cpSync(path.join(process.cwd(), "data", "bin", serie["id"].toString()), path.join(process.cwd(), "data", "novels", serie["id"].toString()), {recursive: true})
    } else if (serie["type"] == "Manga") {
        if (fs.existsSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()), { recursive: true, force: true })
        fs.cpSync(path.join(process.cwd(), "data", "bin", serie["id"].toString()), path.join(process.cwd(), "data", "mangas", serie["id"].toString()), {recursive: true})

        if (!fs.existsSync(path.join(process.cwd(), "public", "pages", serie.shortname))) fs.mkdirSync(path.join(process.cwd(), "public", "pages", serie.shortname))

        var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", serie.id.toString(), "chapters"))

        for (chapter of chapters) {
            if (!fs.existsSync(path.join(process.cwd(), "data", "bin", serie.id.toString(), "chapters", chapter, "pages"))) fs.mkdirSync(path.join(process.cwd(), "data", "bin", serie.id, "chapters", chapter, "pages"))
            fs.cpSync(path.join(process.cwd(), "data", "bin", serie.id.toString(), "chapters", chapter, "pages"), path.join(process.cwd(), "public", "pages", serie.shortname), { recursive: true })
        }
    }
    if (serie["genre"]) {
        serie["genre"].forEach(e => {
            if (!fs.existsSync(path.join(process.cwd(), "data", "tags", e))) fs.mkdirSync(path.join(process.cwd(), "data", "tags", e))
            fs.cpSync(path.join(process.cwd(), "data", "bin", serie["id"].toString()), path.join(process.cwd(), "data", "tags", e, serie["id"].toString()), {recursive: true})
        });
    }
}