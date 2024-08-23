import { notFound } from 'next/navigation'
import fs from "fs"
import path from "path";

export async function GET(req) {
  if (!fs.existsSync(path.join(process.cwd(), "data", "tags"))) return notFound()
  var tags = fs.readdirSync(path.join(process.cwd(), "data", "tags"))

  return new Response(JSON.stringify(tags, null, 2))
}