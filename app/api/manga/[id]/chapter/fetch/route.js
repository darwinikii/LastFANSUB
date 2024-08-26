import Database from "@/src/Database"

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  const chapters = Database.manga.chapter.all(parseFloat(params["id"]))
  .map(e => Database.manga.chapter.get(parseFloat(params["id"]), e));

  return Response.json(chapters);
}