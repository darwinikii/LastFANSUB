import Database from "@/src/Database";
const domain = "https://lastfansub.vercel.app/"

export function generateStaticParams() {
  var params = []
  const series = Database.novel.all()
    .map(e => ({
      "id": `${e}`,
      "volumes": Database.novel.volume.all(e)
    }))

  series.forEach((serie) => {
    serie["volumes"].forEach((volume) => {
      params.push({
        "id": `${serie["id"]}`,
        "vol": `${volume}`
      })
    });
  });

  return params
}

export async function GET(req, { params }) {
  if (!params || !params["id"] || isNaN(parseFloat(params["id"]))) return Response.redirect(new URL("/not-found/", domain))
  if (!params || !params["vol"] || isNaN(parseFloat(params["vol"]))) return Response.redirect(new URL("/not-found/", domain))
  const list = Database.novel.chapter.all(parseFloat(params["id"]), parseFloat(params["vol"]))

  if (list.length > 0) return Response.redirect(new URL("/novel/" + params["id"] + "/volume/" +  params["vol"] + "/chapter/" + list[0], domain))
  else return Response.redirect(new URL("/not-found/", domain))
}