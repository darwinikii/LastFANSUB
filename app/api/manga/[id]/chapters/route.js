import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "chapters")).filter(f => !f.startsWith('.')).sort(function(a, b){return a - b})

  var list = chapters.map(chapter => {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", chapter)))
  });

  return new Response(JSON.stringify({list}, null, 2))
}