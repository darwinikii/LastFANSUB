import Database from '@/src/Database'

export async function GET(req) {
  const novelIdList = Database.novel.all()

  return Response.json(novelIdList)
}