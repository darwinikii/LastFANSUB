import Database from "@/src/Database";

export async function GET(req, { params }) {
  console.log("GET /api/novel/" + params["id"]);
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  const data = Database.novel.get(parseFloat(params["id"]));
  const lastChapters = Database.novel.lastChapters(parseFloat(params["id"]));

  console.log(data)
  console.log(lastChapters)

  return Response.json(Object.assign(data, { lastChapters }));
}