import Database from '@/src/Database'

export async function GET(req) {
  const mangaIdList = Database.manga.all()

  return Response.json(mangaIdList)
}