import Database from "@/src/Database"

export async function GET() {
  const series = 
    Database.all()
    .map(e => Database.get(e))
    .filter(e => e !== null)
    .map(e => {
      if (e["type"] == 0) var lastChapters = Database.novel.lastChapters(e["id"])
      else if (e["type"] == 1) var lastChapters = Database.manga.lastChapters(e["id"])
      
      if (lastChapters.length <= 0) return false

      return Object.assign(e, { lastChapters })
    })
    .filter(e => e !== false)
    .sort((a, b) => b["lastChapters"][0]["timestamp"] - a["lastChapters"][0]["timestamp"])
  
  return Response.json(series)
}