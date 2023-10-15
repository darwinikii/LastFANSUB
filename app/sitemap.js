import fs from 'fs';
import path from 'path';
var domain = 'lastfansub.vercel.app'

export default function sitemap() {
    var dataFolder = fs.readdirSync(path.join(process.cwd(), "data", "bin"))

    var sites = [
      {
        url: "https://" + domain,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      }
    ];

    dataFolder.forEach(dataId => {
        if (!fs.existsSync(path.join(process.cwd(), "data", "bin", dataId, "data.json"))) return
        var data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", dataId, "data.json")));

        sites.push({
            url: "https://" + domain + "/" + data.type.toLowerCase() + "/" + data.id.toString(),
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
          })

        if (data.type == "Novel") {
          if (!fs.existsSync(path.join(process.cwd(), "data", "bin", dataId, "volumes"))) return
          var volumes = fs.readdirSync(path.join(process.cwd(), "data", "bin", dataId, "volumes"))

          volumes.forEach(volumeId => {
            var volume = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", dataId, "volumes", volumeId, "data.json")));

            sites.push({
              url: "https://" + domain + "/" + data.type.toLowerCase() + "/" + data.id.toString() + "/volume/" + volume.id,
              lastModified: new Date(),
              changeFrequency: 'daily',
              priority: 0.8,
            })
          });
        } else if (data.type == "Manga") {
          if (!fs.existsSync(path.join(process.cwd(), "data", "bin", dataId, "chapters"))) return
          var chapters = fs.readdirSync(path.join(process.cwd(), "data", "bin", dataId, "chapters"))

          chapters.forEach(chapterId => {
            var chapter = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", dataId, "chapters", chapterId)));

            sites.push({
              url: "https://" + domain + "/" + data.type.toLowerCase() + "/" + data.id.toString() + "/chapter/" + chapter.id,
              lastModified: new Date(),
              changeFrequency: 'daily',
              priority: 0.8,
            })
          });
        }
    });

    return sites
  }