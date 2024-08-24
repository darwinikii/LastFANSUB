var markdown = 
``;

markdown = markdown
.replaceAll("\n\n", "\n\r &nbsp; \n\r")
.replaceAll(`‘`, `'`)
.replaceAll(`’’`, `"`)
.replaceAll(`’`, `'`)
.replaceAll(`“`, `"`)
.replaceAll(`”`, `"`)

// Markdown kodunu bir JSON objesine ekleyin
var data = {
    "markdown": markdown
};

// JSON dosyasına yazın
var fs = require('fs');
fs.writeFileSync('data.json', JSON.stringify(data, null, 4))