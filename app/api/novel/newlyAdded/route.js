import fs from "fs"
import path from "path";

export async function GET() {
    var novels = fs.readdirSync(path.join(process.cwd(), "data")).filter(f => !f.startsWith('.'))
    novels.slice(-4)

    novels.forEach((e, i) => {
      var data = fs.readFileSync(path.join(process.cwd(), "data", e, "data.json"))
      novels[i] = JSON.parse(data.toString())
    })
  
    return new Response(JSON.stringify({
        novels
    }))
  }