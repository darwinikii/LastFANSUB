import { notFound } from 'next/navigation'
import fs from "fs"

export async function GET(req, { params }) {
  if (!fs.existsSync("./app/data/" + params.id + "/volumes/" + params.vol + "/chapters/" + params.chap + ".json")) return notFound()
  var chapter = JSON.parse(fs.readFileSync("./app/data/" + params.id + "/volumes/" + params.vol + "/chapters/" + params.chap + ".json"))

  return new Response(JSON.stringify(chapter, null, 2))
}