import Database from "@/src/Database"

export function generateStaticParams() {
  return Database.novel.all().map(e => ({ "id": `${e}` }));
}

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  const volumes = Database.novel.volume.all(parseFloat(params["id"]))
  .map(e => Database.novel.volume.get(parseFloat(params["id"]), e));

  return Response.json(volumes);
}