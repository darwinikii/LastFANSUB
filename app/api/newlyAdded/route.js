import fs from "fs"
import path from "path";

export async function GET() {
    var series = fs.readdirSync(path.join(process.cwd(), "data", "bin"))
      .filter(f => !f.startsWith('.'))
      .map((e, i) => JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", e, "data.json"))))
      .sort((a, b) => b[["updateTimestamp"]] - a["updateTimestamp"])    
  
    return new Response(JSON.stringify(series, null, 2))
  }