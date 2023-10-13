import { notFound } from 'next/navigation'
import fs from "fs"

export async function GET(req, { params }) {
  if (params.id == undefined) return
  if (!fs.existsSync("./app/data/" + params.id + "/data.json")) return notFound()
  var novel = JSON.parse(fs.readFileSync("./app/data/" + params.id + "/data.json"))
  var volumes = fs.readdirSync("./app/data/" + params.id + "/volumes/")

  volumes.sort(function(a, b){return a - b})

  novel["volumes"] = []
  volumes.forEach((e) => {
    var volume = JSON.parse(fs.readFileSync("./app/data/" + params.id + "/volumes/" + e + "/data.json"))

    novel["volumes"].push(volume)
  })

  return new Response(JSON.stringify(novel, null, 2))
}