import Database from "@/src/Database"

export function generateStaticParams() {
  var params = []
  const series = Database.novel.all()
    .map(e => ({
      "id": `${e}`,
      "volumes": Database.novel.volume.all(e)
    }))

  series.forEach((serie) => {
    serie["volumes"].forEach((volume) => {
      params.push({
        "id": `${serie["id"]}`,
        "vol": `${volume}`
      })
    });
  });

  return params
}

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  if (!params || !params["vol"] || isNaN(parseFloat(params["vol"]))) return Response.json(null);
  const volume = Database.novel.volume.get(parseFloat(params["id"]), parseFloat(params["vol"]));
  const serie = Database.novel.get(parseFloat(params["id"]))

  return Response.json({
    serie,
    volume
  })
}