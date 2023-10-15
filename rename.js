const fs = require('fs');

var files = fs.readdirSync("./").filter(e => e.endsWith(".png")).sort((a, b) => parseInt(a.split("-")[0]) - parseInt(b.split("-")[0]));

for (file of files) {
    
    console.log("./" + file, "./" + file.split("-")[0] + ".png")
    fs.renameSync("./" + file, "./" + file.split("-")[0] + ".png");
}