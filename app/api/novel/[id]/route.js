import Database from "@/src/Database";

export function generateStaticParams() {
  return Database.novel.all().map(e => ({ "id": `${e}` }));
}

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  const data = Database.novel.get(parseFloat(params["id"]));

  return Response.json(data)
}