const fs = require('fs')
const fse = require('fs-extra');
const path = require('path')

fse.emptyDirSync(path.join(process.cwd(), "data", "manga"))
fse.emptyDirSync(path.join(process.cwd(), "data", "novel"))
fse.emptyDirSync(path.join(process.cwd(), "data", "tag"))
fse.emptyDirSync(path.join(process.cwd(), "data", "translator"))

var series = fs.readdirSync(path.join(process.cwd(), "data", "raw"))
    .map(e =>
        fs.existsSync(path.join(process.cwd(), "data", "raw", e, "data.json")) ?
            JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "raw", e, "data.json")))
            :
            false
    )

for (serie of series) {
    if (serie["type"] == 0) {
        if (fs.existsSync(path.join(process.cwd(), "data", "novel", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "novel", serie["id"].toString()), { recursive: true, force: true })
        fs.writeFileSync(path.join(process.cwd(), "data", "novel", serie["id"].toString()), "true")
    } else if (serie["type"] == 1) {
        if (fs.existsSync(path.join(process.cwd(), "data", "manga", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "manga", serie["id"].toString()), { recursive: true, force: true })
        fs.writeFileSync(path.join(process.cwd(), "data", "manga", serie["id"].toString()), "true")
    }
    if (serie["genre"]) {
        serie["genre"].forEach(e => {
            if (!fs.existsSync(path.join(process.cwd(), "data", "tag", e))) fs.mkdirSync(path.join(process.cwd(), "data", "tag", e))
            fs.writeFileSync(path.join(process.cwd(), "data", "tag", e, serie["id"].toString()), "true")
        });
    }
    if (serie["translator"]) {
        fs.mkdirSync(path.join(process.cwd(), "data", "translator", serie["translator"]), { recursive: true })
        fs.writeFileSync(path.join(process.cwd(), "data", "translator", serie["translator"], serie["id"].toString()), "true", { recursive: true })
    }
}