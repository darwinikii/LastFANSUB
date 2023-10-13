import fs from "fs"
import path from "path";

export async function GET() {
    var novels = fs.readdirSync(path.join(process.cwd(), "data"))
    const shuffled = novels.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 4);

    selected.forEach((e, i) => {
      var data = fs.readFileSync(path.join(process.cwd(), "data", e, "data.json"))
      selected[i] = JSON.parse(data.toString())
    })
  
    return new Response(JSON.stringify({
        novels: selected
    }))
  }