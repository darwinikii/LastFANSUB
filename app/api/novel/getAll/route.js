import { notFound } from 'next/navigation'
import fs from "fs"
import path from "path";

export async function GET(req) {
  if (!fs.existsSync(path.join(process.cwd(), "data", "novels"))) return notFound()
  var novels = fs.readdirSync(path.join(process.cwd(), "data", "novels")).sort(function(a, b){return a - b})

  return new Response(JSON.stringify({ novels }, null, 2))
}