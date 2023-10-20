var markdown = ``;

markdown = markdown.split("\n\n")

markdown.forEach((e, i) => {
    markdown[i] = "<p>" + e + "</p>"
});

markdown = markdown.join("\n\n")

// Markdown kodunu bir JSON objesine ekleyin
var data = {
    "m": markdown
};

// JSON dosyasına yazın
var fs = require('fs');
fs.writeFileSync('data.json', JSON.stringify(data, null, 4))