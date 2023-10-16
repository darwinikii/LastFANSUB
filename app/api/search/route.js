import fs from "fs"
import path from "path";

function removeArrayContentsFromString(text, arr) {
    arr.forEach(txt => {
        text = text.toLowerCase().replaceAll(txt.toLowerCase(), "");
    })

    text = text.split(" ").filter(txt => txt != "").join(" ")
    return text
}

function containsAll() {
    var output = [];
    var cntObj = {};
    var array, item, cnt;
    // for each array passed as an argument to the function
    for (var i = 0; i < arguments.length; i++) {
        array = arguments[i];
        // for each element in the array
        for (var j = 0; j < array.length; j++) {
            item = "-" + array[j];
            cnt = cntObj[item] || 0;
            // if cnt is exactly the number of previous arrays, 
            // then increment by one so we count only one per array
            if (cnt == i) {
                cntObj[item] = cnt + 1;
            }
        }
    }
    // now collect all results that are in all arrays
    for (item in cntObj) {
        if (cntObj.hasOwnProperty(item) && cntObj[item] === arguments.length) {
            output.push(item.substring(1));
        }
    }
    return(output);
}    

export async function GET(request) {
    if (request.nextUrl.searchParams.has("text") == true) {
        var tags = fs.readdirSync(path.join(process.cwd(), "data", "tags"));
        var text = request.nextUrl.searchParams.get("text")
        
        var textTags = tags.filter(e => text.toLowerCase().includes(e.toLowerCase()))
        var textContent = removeArrayContentsFromString(text, textTags);
        
        var series = []

        textTags = textTags.map(tag => fs.readdirSync(path.join(process.cwd(), "data", "tags", tag)))
        textTags = !textTags[0] ? [fs.readdirSync(path.join(process.cwd(), "data", "bin"))] : textTags
        series = containsAll(...textTags)
        series = series.map(serie => JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", serie, "data.json"))))
        series = series.filter(serie => textContent.split(" ").map(key => key == '' || serie.shortname.toLowerCase().includes(key.toLowerCase()) || serie.name.toLowerCase().includes(key.toLowerCase()) || serie.fullName.toLowerCase().includes(key.toLowerCase()) || serie.secName.toLowerCase().includes(key.toLowerCase())).includes(true))
    
        return new Response(JSON.stringify(series, null, 2))
    } else {
        return new Response(JSON.stringify({
            error: 400,
            message: "Bad Request"
        }, null, 2))
    }
}