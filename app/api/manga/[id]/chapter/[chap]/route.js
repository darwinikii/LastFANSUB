import Database from "@/src/Database"

export function generateStaticParams() {
  var params = []
  const series = Database.manga.all()
    .map(e => ({
      "id": e,
      "chapters": Database.manga.chapter.all(e)
    }))

  series.forEach((serie) => {
    serie["chapters"].forEach((chapter) => {
      params.push({
        "id": `${serie["id"]}`,
        "chap": `${chapter}`
      })
    });
  });

  return params
}

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  if (!params || !params["chap"] || isNaN(parseFloat(params["chap"]))) return Response.json(null);
  const chapter = Database.manga.chapter.get(parseFloat(params["id"]), parseFloat(params["chap"]));

  return Response.json(chapter)
}