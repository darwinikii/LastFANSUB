import Database from "@/src/Database"

export function generateStaticParams() {
  var params = []
  const series = Database.novel.all()
    .map(e => ({
      "id": `${e}`,
      "volumes": Database.novel.volume.all(e)
      .map(r => ({
        "id": `${r}`,
        "chapters": Database.novel.chapter.all(e, r)
      }))
    }))

  series.forEach((serie) => {
    serie["volumes"].forEach((volume) => {
      volume["chapters"].forEach((chapter) => {
        params.push({
          "id": `${serie["id"]}`,
          "vol": `${volume["id"]}`,
          "chap": `${chapter}`
        });
      });
    });
  });

  return params
}

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.json(null);
  if (!params || !params["vol"] || isNaN(parseFloat(params["vol"]))) return Response.json(null);
  if (!params || !params["chap"] || isNaN(parseFloat(params["chap"]))) return Response.json(null);
  const data =
    Database.novel.chapter.get(parseFloat(params["id"]), parseFloat(params["vol"]), parseFloat(params["chap"]));

  return Response.json(data)
}