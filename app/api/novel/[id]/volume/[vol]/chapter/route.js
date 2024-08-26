import Database from "@/src/Database"

export async function GET(req, { params }) {
  console.log("GET /api/novel/" + params["id"] + "/volume/" + params["vol"] + "/chapter")
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  if (!params || !params["vol"] || isNaN(parseFloat(params["vol"]))) return Response.json(null);
  const chapters = Database.novel.chapter.all(parseFloat(params["id"]), parseFloat(params["vol"]))

  return Response.json(chapters);
}