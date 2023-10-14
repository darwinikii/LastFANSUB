import fs from "fs"
import path from "path";

export async function GET() {
    var novels = fs.readdirSync(path.join(process.cwd(), "data", "bin")).filter(f => !f.startsWith('.')).slice(-4).reverse()

    novels.forEach((e, i) => {
      var data = fs.readFileSync(path.join(process.cwd(), "data", "bin", e, "data.json"))
      novels[i] = JSON.parse(data.toString())
    })
  
    return new Response(JSON.stringify({
        novels
    }))
  }