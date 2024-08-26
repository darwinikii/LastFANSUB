import Database from "@/src/Database";

export async function GET(req, { params }) {
  console.log("GET /api/manga/" + params["id"]);
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  const data = Database.manga.get(parseFloat(params["id"]));
  const lastChapters = Database.manga.lastChapters(parseFloat(params["id"]));

  return Response.json(Object.assign(data, { lastChapters }));
}