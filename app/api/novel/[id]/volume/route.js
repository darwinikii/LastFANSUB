import Database from "@/src/Database"

export async function GET(req, { params }) {
  console.log("GET /api/novel/" + params["id"] + "/volume");
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  const chapters = Database.novel.volume.all(parseFloat(params["id"]));

  return Response.json(chapters);
}