import fs from 'fs';
import path from 'path';
var domain = 'https://lastfansub.vercel.app'

export default function sitemap() {
    var dataFolder = fs.readdirSync(path.join(process.cwd(), "data", "bin"))

    var sites = dataFolder.map(e => {
        if (!fs.existsSync(path.join(process.cwd(), "data", "bin", e, "data.json"))) return
        var data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", e, "data.json")));

        return {
            url: path.join(domain, data.type.toLowerCase(), data.id.toString()),
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
          }
    });

    sites.push({
        url: path.join(domain, "/"),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      })

    return sites
  }