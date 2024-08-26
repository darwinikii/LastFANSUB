import Database from "@/src/Database";

export async function GET(req) {
  const tags =
    Database.tag.all()

  return Response.json(tags);
}