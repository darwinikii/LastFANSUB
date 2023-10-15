import { notFound } from 'next/navigation'
import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters", params.chap + ".json"))) return notFound()
  var chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "volumes", params.vol, "chapters", params.chap + ".json")))

  return new Response(JSON.stringify(chapter, null, 2))
}