import Database from "@/src/Database";
var domain = 'lastfansub.vercel.app'

export default function sitemap() {
    var series = Database.all();

    var sites = [
      {
        url: "https://" + domain,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      }
    ];

    series.forEach(dataId => {
        var data = Database.get(dataId);

        if (data["type"] == 0) {
          sites.push({
            url: "https://" + domain + "/novel/" + data["id"].toString(),
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
          })
          var volumes = Database.novel.volume.all(dataId);

          volumes.forEach(volumeId => {
            var volume = Database.novel.volume.get(dataId, volumeId);

            sites.push({
              url: "https://" + domain + "/novel/" + data["id"].toString() + "/volume/" + volume["id"].toString(),
              lastModified: new Date(),
              changeFrequency: 'daily',
              priority: 0.8,
            })
          });
        } else if (data["type"] == 1) {
          sites.push({
            url: "https://" + domain + "/manga/" + data["id"].toString(),
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
          })
          var chapters = Database.manga.chapter.all(dataId);

          chapters.forEach(chapterId => {
            var chapter = Database.manga.chapter.get(dataId, chapterId);

            sites.push({
              url: "https://" + domain + "/manga/" +  data["id"].toString() + "/chapter/" + chapter["id"].toString(),
              lastModified: new Date(),
              changeFrequency: 'daily',
              priority: 0.8,
            })
          });
        }
    });

    return sites
  }