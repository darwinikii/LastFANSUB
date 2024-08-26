import Database from "@/src/Database"

export async function GET(req, { params }) {
  console.log("GET /api/novel/" + params["id"] + "/volume/" + params["vol"])
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  if (!params || !params["vol"] || isNaN(parseFloat(params["vol"]))) return Response.json(null);
  const volume = Database.novel.volume.get(parseFloat(params["id"]), parseFloat(params["vol"]));

  return Response.json(volume)
}