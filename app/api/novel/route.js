import Database from '@/src/Database'

export async function GET(req) {
  console.log("GET /api/novel/");
  const novelIdList = Database.novel.all()

  return Response.json(novelIdList)
}