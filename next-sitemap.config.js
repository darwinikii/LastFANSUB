const fs = require("fs")
const path = require("path")

module.exports = {
    siteUrl: 'https://lastfansub.vercel.app',
    generateRobotsTxt: true,
    exclude: ["/api/*", "/uptime/*", "/api"],
    generateIndexSitemap: true,
    robotsTxtOptions: {
      additionalSitemaps: ["https://lastfansub.vercel.app/sitemap-0.xml"]
    },
    additionalPaths: async (config) => {
      var dataFolder = fs.readdirSync(path.join(process.cwd(), "data", "bin"))

      var list = dataFolder.map(async dataId => {
        var isData = fs.existsSync(path.join(process.cwd(), "data", "bin", dataId, "data.json"))
        
        if (!isData) return
        var data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "bin", dataId, "data.json")));

        console.log(data.type);
        return await config.transform(config, "/" + data.type.toLowerCase() + "/" + dataId)
      })
      
      list = await Promise.all(list)

      return list
    },
  }