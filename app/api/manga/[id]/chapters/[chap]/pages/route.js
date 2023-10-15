import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  if (!fs.existsSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", params.chap, "pages"))) return new Response({ za: fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", params.chap )) })
  var pages = fs.readdirSync(path.join(process.cwd(), "data", "bin", params.id, "chapters", params.chap, "pages"));

  return new Response(JSON.stringify({pages}, null, 2))
}