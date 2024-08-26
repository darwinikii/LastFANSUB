import Database from "@/src/Database";

export async function GET(req, { params }) {
  console.log("GET /api/novel/" + params["id"]);
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  const data = Database.novel.get(parseFloat(params["id"]));

  return Response.json(data)
}