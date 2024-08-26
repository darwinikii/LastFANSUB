import Database from "@/src/Database";

export async function GET(request) {
    console.log("GET /api/search?text=" + request.nextUrl.searchParams.get("text"));
    if (!request.nextUrl.searchParams.has("text")) return []
    var text = request.nextUrl.searchParams.get("text").toLowerCase().split(" ");

    const series = Database.all()
      .map(Database.get)
    const tags = Database.tag.all()
    const translators = Database.translator.all()

    const textTags = tags.filter(tag => text.includes(tag.toLowerCase()))
    const textTranslators = translators.filter(translator => text.includes(translator.toLowerCase()))
    const textTypes = text.filter(txt => txt == "novel" || txt == "manga")
    const textContent = 
    text.map(text => {
        for (const tag of textTags) {
            if (tag.toLowerCase() === text) return false;
        };
        for (const translator of textTranslators) {
            if (translator.toLowerCase() === text) return false;
        };
        for (const type of textTypes) {
            if (type === text) return false;
        };

        return text;
    }).filter(Boolean)

    const result = series
        .filter(serie => {
            for (const tag of textTags) {
                if (!serie["genre"].includes(tag)) return false;
            };
            for (const translator of textTranslators) {
                if (serie["translator"] !== translator) return false;
            };
            if (textTypes.length > 0 && serie["type"] == 0 && !textTypes.includes("novel")) return false;
            else if (textTypes.length > 0 && serie["type"] == 1 && !textTypes.includes("manga")) return false;
            
            const isOk = textContent.filter(text => {
                for (const name of serie["names"]) {
                    if (name.toLowerCase().includes(text.toLowerCase())) return true
                }

                if (serie["shortname"].includes(text.toLowerCase())) return true
                else return false
            });

            return textContent.length === isOk.length;
        })

    return Response.json(result);
}