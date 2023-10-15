import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", params.chap + ".json"))) return new Response({ za: fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", params.chap )) })
  var data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", params.chap + ".json")));

  return new Response(JSON.stringify({ pages: data.pages }, null, 2))
}