import Database from "@/src/Database"

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  if (!params || !params["chap"] || isNaN(parseFloat(params["chap"]))) return Response.json(null);
  const chapter = Database.manga.chapter.get(parseFloat(params["id"]), parseFloat(params["chap"]));

  return Response.json(chapter)
}