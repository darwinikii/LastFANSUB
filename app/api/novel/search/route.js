import fs from "fs"
import path from "path";

export async function GET(request) {
    if (request.nextUrl.searchParams.has("text") == true) {
        var text = request.nextUrl.searchParams.get("text")
        var files = fs.readdirSync(path.join(process.cwd(), "data"))

        var result = []

        files.forEach((e, i, a) => {
            var file = fs.readFileSync(path.join(process.cwd(), "data", e, "data.json"))
            file = JSON.parse(file.toString())

            if (file.name.toLowerCase().includes(text.toLowerCase()) || file.fullName.toLowerCase().includes(text.toLowerCase()) || file.secName.toLowerCase().includes(text.toLowerCase())) {
                result.push(file)
            } else {
                return
            }
        })
    
        return new Response(JSON.stringify(result, null, 2))
    } else {
        return new Response(JSON.stringify({
            error: 400,
            message: "Bad Request"
        }, null, 2))
    }
}