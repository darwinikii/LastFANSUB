const fs = require('fs')
const path = require('path')

var novels = fs.readdirSync(path.join(process.cwd(), "data"))

novels.forEach(n => {
    if (!fs.existsSync(path.join(process.cwd(), "data", n, "volumes"))) {
        fs.mkdirSync(path.join(process.cwd(), "data", n, "volumes"))
        var volumes = fs.readdirSync(path.join(process.cwd(), "data", n, "volumes"))
        volumes.forEach(v => {
            if (!fs.existsSync(path.join(process.cwd(), "data", n, "volumes", v, "chapters"))) {
                fs.mkdirSync(path.join(process.cwd(), "data", n, "volumes", v, "chapters"))
            }
        })
    }
})

console.log("Data fixed")