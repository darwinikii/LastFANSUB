var markdown = `
# Başlık

Bu bir paragraf.

- Liste öğesi 1
- Liste öğesi 2
`;

// Markdown kodunu bir JSON objesine ekleyin
var data = {
    "markdown": markdown
};

// JSON dosyasına yazın
var fs = require('fs');
fs.writeFileSync('data.json', JSON.stringify(data, null, 4));