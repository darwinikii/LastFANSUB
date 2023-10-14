const fs = require("fs")
const path = require("path")

module.exports = {
    siteUrl: 'https://lastfansub.vercel.app',
    generateRobotsTxt: true,
    exclude: ["/api/*", "/uptime/*", "/api"],
    generateIndexSitemap: false,
    additionalPaths: async (config) => {
      var dataFolder = fs.readdirSync(path.join(process.cwd(), "data"))

      var list = dataFolder.map(async dataId => {
        var isData = fs.existsSync(path.join(process.cwd(), "data", dataId, "data.json"))

        if (isData) return await config.transform(config, "/novel/" + dataId)
      })
      
      list = await Promise.all(list)

      return list
    },
  }