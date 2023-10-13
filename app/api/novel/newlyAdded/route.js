import fs from "fs"

export async function GET() {
    var novels = fs.readdirSync("./app/data")

    novels.slice(-4)

    novels.forEach((e, i) => {
      var data = fs.readFileSync("./app/data/" + e + "/data.json")
      novels[i] = JSON.parse(data.toString())
    })
  
    return new Response(JSON.stringify({
        novels
    }))
  }