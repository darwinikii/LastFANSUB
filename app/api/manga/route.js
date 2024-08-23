import { notFound } from 'next/navigation'
import fs from "fs"
import path from "path";

export async function GET(req) {
  if (!fs.existsSync(path.join(process.cwd(), "data", "mangas"))) return notFound()
  var mangas = fs.readdirSync(path.join(process.cwd(), "data", "mangas")).sort(function(a, b){return a - b})

  return new Response(JSON.stringify(mangas, null, 2))
}