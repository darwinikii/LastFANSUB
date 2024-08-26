import Database from '@/src/Database'

export async function GET(req) {
  console.log("GET /api/manga/");
  const mangaIdList = Database.manga.all()

  return Response.json(mangaIdList)
}