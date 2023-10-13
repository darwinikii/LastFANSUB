const fs = require("fs")

module.exports = {
    siteUrl: 'https://lastfansub.repl.co',
    generateRobotsTxt: true,
    exclude: ["/api/*", "/uptime/*", "/api"],
    additionalPaths: async (config) => {
      var dataFolder = fs.readdirSync("./data/")

      var list = dataFolder.map(async dataId => {
        var isData = fs.existsSync("./app/data/" + dataId + "/data.json")
        var isVolumes = fs.existsSync("./app/data/" + dataId + "/volumes/")

        if (isData && isVolumes) return await config.transform(config, "/novel/" + dataId)
      })
      
      list = await Promise.all(list)

      return list
    },
  }