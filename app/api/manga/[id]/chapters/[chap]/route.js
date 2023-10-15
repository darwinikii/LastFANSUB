import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  var chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", params.chap + ".json")))

  return new Response(JSON.stringify(chapter, null, 2))
}