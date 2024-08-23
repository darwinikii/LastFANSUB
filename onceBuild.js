const { time } = require('console');
const fs = require('fs')
const fse = require('fs-extra');
const path = require('path')

fse.emptyDirSync(path.join(process.cwd(), "data", "mangas"))
fse.emptyDirSync(path.join(process.cwd(), "data", "novels"))
fse.emptyDirSync(path.join(process.cwd(), "data", "tags"))

var series = fs.readdirSync(path.join(process.cwd(), "data", "bin"))
    .map(e =>
        fs.existsSync(path.join(process.cwd(), "data", "bin", e, "data.json")) ?
            JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", e, "data.json")))
            :
            false
    )

for (serie of series) {
    if (serie["type"] == "Novel") {
        if (fs.existsSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()), { recursive: true, force: true })
        fs.writeFileSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()), "true")

        if (fs.existsSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "volumes"))) {
            var volumes = fs.readdirSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "volumes"))
                .sort((a, b) => parseFloat(a) - parseFloat(b))
                .filter(e => fs.existsSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "volumes", e, "data.json")))
                .map(e => JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "volumes", e, "data.json"))))

            for (volume of volumes) {
                var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "volumes", volume["id"].toString(), "chapters"))
                    .sort((a, b) => parseFloat(path.parse(a).name) - parseFloat(path.parse(b).name))
                    .map(e => JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "volumes", volume["id"].toString(), "chapters", e))))

                for (chapter of chapters) {
                    if (chapter["enabled"] == false) continue
                    else volume["updateTimestamp"] = chapter["updateTimestamp"]
                }

                if (volume["enabled"] == false) continue
                else serie["updateTimestamp"] = volume["updateTimestamp"]

                serie["last"] = chapters
                    .filter((e) => e["enabled"] != false)
                    .slice(-4)
                    .map(e => ({ chapter: e["id"].toString(), volume: volume["id"].toString(), timestamp: e["updateTimestamp"] }))

                fs.writeFileSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "volumes", volume["id"].toString(), "data.json"), JSON.stringify(volume, null, 2))
            }

            if (serie["last"].length < 4) {
                volumes
                  .slice(0, volumes.length - 1)
                  .forEach((e) => {
                    if (serie["last"].length >= 4) return
                    var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "volumes", volume["id"].toString(), "chapters"))
                        .sort((a, b) => parseFloat(path.parse(b).name) - parseFloat(path.parse(a).name))
                        .map(e => JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "volumes", volume["id"].toString(), "chapters", e))))
                        .filter((e) => e["enabled"] != false)

                    for (chapter of chapters) {
                        serie["last"].unshift({ id: e["id"].toString(), timestamp: e["updateTimestamp"] })
                        if (serie["last"].length >= 4) return
                    }
                })
            }

            fs.writeFileSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "data.json"), JSON.stringify(serie, null, 2))
        }
    } else if (serie["type"] == "Manga") {
        if (fs.existsSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()), { recursive: true, force: true })
        fs.writeFileSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()), "true")

        if (fs.existsSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "chapters"))) {
            var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "chapters"))
                .sort((a, b) => parseFloat(path.parse(a).name) - parseFloat(path.parse(b).name))
                .map(e => JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "chapters", e))))

            for (chapter of chapters) {
                if (chapter["enabled"] == false) continue
                else serie["updateTimestamp"] = chapter["updateTimestamp"]
            }

            serie["last"] = chapters
                .filter((e) => e["enabled"] != false)
                .slice(-4)
                .map(e => ({ chapter: e["id"].toString(), timestamp: e["updateTimestamp"] }))

            fs.writeFileSync(path.join(process.cwd(), "data", "bin", serie["id"].toString(), "data.json"), JSON.stringify(serie, null, 2))
        }
    }
    if (serie["genre"]) {
        serie["genre"].forEach(e => {
            if (!fs.existsSync(path.join(process.cwd(), "data", "tags", e))) fs.mkdirSync(path.join(process.cwd(), "data", "tags", e))
            fs.writeFileSync(path.join(process.cwd(), "data", "tags", e, serie["id"].toString()), "true")
        });
    }
}