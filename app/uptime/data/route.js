import fs from 'fs'

export function GET() {
  var data = {}
  try {
    data["novels"] = fs.readdirSync("./data")

    data["datas"] = []
    selected.forEach((e, i) => {
      var json = fs.readFileSync("./data/" + e + "/data.json")

      data["datas"].push(json)
    })

  } catch (e) {

  }

  JSON.parse(JSON.stringify(data, null, 2))
  
  return new Response(Date.now())
}