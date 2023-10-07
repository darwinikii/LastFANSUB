import fs from "fs"

export async function GET(req, { params }) {
  if (params.id == undefined) return
  var novel = JSON.parse(fs.readFileSync("./data/" + params.id + "/data.json"))
  var volumes = fs.readdirSync("./data/" + params.id + "/volumes/")

  volumes.sort(function(a, b){return a - b})

  novel["volumes"] = []
  volumes.forEach((e) => {
    var volume = JSON.parse(fs.readFileSync("./data/" + params.id + "/volumes/" + e + "/data.json"))

    novel["volumes"].push(volume)
  })

  return new Response(JSON.stringify(novel, null, 2))
}