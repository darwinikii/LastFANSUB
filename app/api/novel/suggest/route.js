import fs from "fs"

export async function GET() {
    var novels = fs.readdirSync("./data")
    const shuffled = novels.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 4);

    selected.forEach((e, i) => {
      var data = fs.readFileSync("./data/" + e + "/data.json")
      selected[i] = JSON.parse(data.toString())
    })
  
    return new Response(JSON.stringify({
        novels: selected
    }))
  }