import Database from "@/src/Database"

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  const volumes = Database.novel.volume.all(parseFloat(params["id"]))
  .map(e => Database.novel.volume.get(parseFloat(params["id"]), e))
  .map(e => {
    const chapters = Database.novel.chapter.all(parseFloat(params["id"]), parseFloat(e["id"]))
    .map(r => Database.novel.chapter.get(parseFloat(params["id"]), parseFloat(e["id"]), r))
    .map(r => {
      r["markdown"] = undefined
      return r
    });
  
    return Object.assign(e, { chapters })
  })

  return Response.json(volumes);
}