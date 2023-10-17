const fs = require('fs')
const fse = require('fs-extra');
const path = require('path')

fse.emptyDirSync(path.join(process.cwd(), "data", "mangas"))
fse.emptyDirSync(path.join(process.cwd(), "data", "novels"))
fse.emptyDirSync(path.join(process.cwd(), "data", "tags"))

var series = fs.readdirSync(path.join(process.cwd(), "data", "bin")).map(e => fs.existsSync(path.join(process.cwd(), "data", "bin", e, "data.json")) ? JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", e, "data.json"))) : false )

for (serie of series) {
    if (serie["type"] == "Novel") {
        if (fs.existsSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()), { recursive: true, force: true })
        fs.writeFileSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()), "true")
    } else if (serie["type"] == "Manga") {
        if (fs.existsSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()), { recursive: true, force: true })
        fs.writeFileSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()), "true")
    }
    if (serie["genre"]) {
        serie["genre"].forEach(e => {
            if (!fs.existsSync(path.join(process.cwd(), "data", "tags", e))) fs.mkdirSync(path.join(process.cwd(), "data", "tags", e))
            fs.writeFileSync(path.join(process.cwd(), "data", "tags", e, serie["id"].toString()), "true")
        });
    }
}