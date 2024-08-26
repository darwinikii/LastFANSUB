import Database from "@/src/Database"

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  if (!params || !params["vol"] || isNaN(parseFloat(params["vol"]))) return Response.json(null);
  if (!params || !params["chap"] || isNaN(parseFloat(params["chap"]))) return Response.json(null);
  const data =
    Database.novel.chapter.get(parseFloat(params["id"]), parseFloat(params["vol"]), parseFloat(params["chap"]));

  return Response.json(data)
}