const fs = require('fs')
const fse = require('fs-extra');
const path = require('path')

fse.emptyDirSync(path.join(process.cwd(), "data", "mangas"))
fse.emptyDirSync(path.join(process.cwd(), "data", "novels"))
fse.emptyDirSync(path.join(process.cwd(), "data", "tags"))
fse.emptyDirSync(path.join(process.cwd(), "public", "pages"))

var series = fs.readdirSync(path.join(process.cwd(), "data", "bin")).map(e => fs.existsSync(path.join(process.cwd(), "data", "bin", e, "data.json")) ? JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", e, "data.json"))) : false )

for (serie of series) {
    if (serie["type"] == "Novel") {
        if (fs.existsSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()), { recursive: true, force: true })
        fs.mkdirSync(path.join(process.cwd(), "data", "novels", serie["id"].toString()))
    } else if (serie["type"] == "Manga") {
        if (fs.existsSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()))) fs.rmSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()), { recursive: true, force: true })
        fs.mkdirSync(path.join(process.cwd(), "data", "mangas", serie["id"].toString()))

        if (!fs.existsSync(path.join(process.cwd(), "public", "pages", serie.shortname))) fs.mkdirSync(path.join(process.cwd(), "public", "pages", serie.shortname))

        var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", serie.id.toString(), "chapters"))

        for (chapter of chapters) {
            if (!fs.existsSync(path.join(process.cwd(), "data", "bin", serie.id.toString(), "chapters", chapter, "pages"))) fs.mkdirSync(path.join(process.cwd(), "data", "bin", serie.id, "chapters", chapter, "pages"))
            fs.cpSync(path.join(process.cwd(), "data", "bin", serie.id.toString(), "chapters", chapter, "pages"), path.join(process.cwd(), "public", "pages", serie.shortname), { recursive: true })
        }
    }
    if (serie["genre"]) {
        serie["genre"].forEach(e => {
            if (!fs.existsSync(path.join(process.cwd(), "data", "tags", e))) fs.mkdirSync(path.join(process.cwd(), "data", "tags", e))
            fs.mkdirSync(path.join(process.cwd(), "data", "tags", e, serie["id"].toString()))
        });
    }
}

/*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0153gt5McKHiB8tM5ghjfqEQXpGh8Aps",
  authDomain: "lastfansub.firebaseapp.com",
  projectId: "lastfansub",
  storageBucket: "lastfansub.appspot.com",
  messagingSenderId: "186957958036",
  appId: "1:186957958036:web:4c1897998c7688d2121d81",
  measurementId: "G-X1RQEWNHZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/*/