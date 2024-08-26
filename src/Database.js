import fs from 'fs';
import path from 'path';

const DatabaseFolder = path.join(process.cwd(), 'data');

const Database = {
    default: () => {
        const isSafe =
            fs.existsSync(path.join(DatabaseFolder)) &&
            fs.existsSync(path.join(DatabaseFolder, 'raw')) &&
            fs.existsSync(path.join(DatabaseFolder, 'tag')) &&
            fs.existsSync(path.join(DatabaseFolder, 'manga')) &&
            fs.existsSync(path.join(DatabaseFolder, 'novel'))

        return isSafe
    },
    all: () => {
        const series =
            fs.readdirSync(path.join(DatabaseFolder, 'raw'))
                .map(parseFloat)
                .filter(n => !isNaN(n))
                .sort((a, b) => a - b);

        return series;
    },
    has: (id) => {
        const series =
            Database.all();

        return series.includes(id);
    },
    valid: (id) => {
        if (!Database.has(id)) return false;
        else return fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`, 'data.json'));
    },
    get: (id) => {
        if (!Database.has(id)) return null;
        else if (!Database.valid(id)) return null;

        const data =
            JSON.parse(fs.readFileSync(path.join(DatabaseFolder, 'raw', `${id}`, 'data.json')));

        return data
    },

    manga: {
        all: () => {
            const mangas =
                fs.readdirSync(path.join(DatabaseFolder, 'manga'))
                    .map(parseFloat)
                    .filter(n => !isNaN(n))
                    .sort((a, b) => a - b);

            return mangas;
        },
        has: (id) => {
            const mangas =
                Database.manga.all();

            return mangas.includes(id);
        },
        valid: (id) => {
            if (!Database.manga.has(id)) return false;
            else return fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`, 'data.json'));
        },
        get: (id) => {
            if (!Database.manga.has(id)) return null;
            else if (!Database.manga.valid(id)) return null;

            const data =
                JSON.parse(fs.readFileSync(path.join(DatabaseFolder, 'raw', `${id}`, 'data.json')));

            return data
        },
        lastChapters: (id) => {
            const chapters =
                Database.manga.chapter.all(id)
                    .map(e => Database.manga.chapter.get(id, e))
                    .slice(-4)
                    .reverse()
                    .map(e =>
                    ({
                        "chapter": e["id"],
                        "timestamp": e["timestamp"]
                    })
                    )

            return chapters;
        },
        chapter: {
            default: (id) => {
                const isSafe =
                    fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`)) &&
                    fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`, 'chapter'));

                return isSafe
            },
            all: (id) => {
                if (!Database.manga.chapter.default(id)) return [];

                const chapters =
                    fs.readdirSync(path.join(DatabaseFolder, 'raw', `${id}`, 'chapter'))
                        .map(e => parseFloat(path.parse(e).name))
                        .filter(n => !isNaN(n))
                        .sort((a, b) => a - b);

                return chapters;
            },
            has: (id, chapter) => {
                const chapters =
                    Database.manga.chapter.all(id);

                return chapters.includes(chapter);
            },
            get: (id, chapter) => {
                if (!Database.manga.chapter.has(id, chapter)) return null;

                const data =
                    JSON.parse(fs.readFileSync(path.join(DatabaseFolder, 'raw', `${id}`, 'chapter', `${chapter}.json`)));

                return data;
            },
        }
    },

    novel: {
        all: () => {
            const novels =
                fs.readdirSync(path.join(DatabaseFolder, 'novel'))
                    .map(parseFloat)
                    .filter(n => !isNaN(n))
                    .sort((a, b) => a - b);

            return novels;
        },
        has: (id) => {
            const novels =
                Database.novel.all();

            return novels.includes(id);
        },
        valid: (id) => {
            if (!Database.has(id)) return false;
            else fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`, 'data.json'));
        },
        get: (id) => {
            if (!Database.has(id)) return null;
            else if (!Database.valid(id)) return null;

            const data =
                fs.readFileSync(path.join(DatabaseFolder, 'raw', `${id}`, 'data.json'));

            return JSON.parse(data);
        },
        lastChapters: (id) => {
            var chapters = [];

            const volumes =
               Database.novel.volume.all(id)
                  .map((volume) => {
                    return {
                        id: volume,
                        chapters: 
                            Database.novel.chapter.all(id, volume)
                            .map(e => Database.novel.chapter.get(id, volume, e)),
                    }
                  })

            volumes.forEach((volume) => {
                volume["chapters"].forEach((chapter) => {
                    chapters.push({
                        volume: volume["id"],
                        chapter: chapter["id"],
                        timestamp: chapter["timestamp"],
                    });
                });
            });

            return chapters.slice(-4).reverse();
        },
        volume: {
            default: (id) => {
                const isSafe =
                    fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`)) &&
                    fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`, 'volume'));

                return isSafe
            },
            all: (id) => {
                if (!Database.novel.volume.default(id)) return [];

                const volumes =
                    fs.readdirSync(path.join(DatabaseFolder, 'raw', `${id}`, 'volume'))
                        .map(parseFloat)
                        .filter(n => !isNaN(n))
                        .sort((a, b) => a - b);

                return volumes;
            },
            has: (id, volume) => {
                const volumes =
                    Database.novel.volume.all(id);

                return volumes.includes(volume);
            },
            valid: (id, volume) => {
                if (!Database.novel.volume.has(id, volume)) return false;
                else return fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`, 'volume', `${volume}`, 'data.json'));
            },
            get: (id, volume) => {
                if (!Database.novel.volume.has(id, volume)) return null;
                else if (!Database.novel.volume.valid(id, volume)) return null;

                const data =
                    JSON.parse(fs.readFileSync(path.join(DatabaseFolder, 'raw', `${id}`, 'volume', `${volume}`, 'data.json')));

                return data;
            },
        },
        chapter: {
            default: (id, volume) => {
                const isSafe =
                    fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`, 'volume', `${volume}`)) &&
                    fs.existsSync(path.join(DatabaseFolder, 'raw', `${id}`, 'volume', `${volume}`, 'chapter'));

                return isSafe
            },
            all: (id, volume) => {
                if (!Database.novel.chapter.default(id, volume)) return [];

                const chapters =
                    fs.readdirSync(path.join(DatabaseFolder, 'raw', `${id}`, 'volume', `${volume}`, 'chapter'))
                        .map(e => parseFloat(path.parse(e).name))
                        .filter(e => !isNaN(e))
                        .sort((a, b) => a - b);

                return chapters;
            },
            has: (id, volume, chapter) => {
                const chapters =
                   Database.novel.chapter.all(id, volume);

                return chapters.includes(chapter);
            },
            get: (id, volume, chapter) => {
                if (!Database.novel.chapter.has(id, volume, chapter)) return null;

                const data =
                   JSON.parse(fs.readFileSync(path.join(DatabaseFolder, 'raw', `${id}`, 'volume', `${volume}`, 'chapter', `${chapter}.json`)));

                return data;
            },
        },
    },

    tag: {
        all() {
            const tags =
                fs.readdirSync(path.join(DatabaseFolder, 'tag'))

            return tags;
        },
        has(name) {
            const tags =
                Database.tag.all()
                    .map((n) => n.toLowerCase());

            return tags.includes(name.toLowerCase());
        },
        get(name) {
            if (!Database.tag.has(name)) return [];

            const series =
                fs.readdirSync(path.join(DatabaseFolder, 'tag', name))
                    .map((n) => parseFloat(n))
                    .filter((n) => !isNaN(n))
                    .sort((a, b) => a - b);

            return series;
        },
    },

    translator: {
        all() {
            const tags =
                fs.readdirSync(path.join(DatabaseFolder, 'translator'))

            return tags;
        },
        has(name) {
            const tags =
                Database.translator.all()
                    .map((n) => n.toLowerCase());

            return tags.includes(name.toLowerCase());
        },
        get(name) {
            if (!Database.translator.has(name)) return [];

            const series =
                fs.readdirSync(path.join(DatabaseFolder, 'translator', name))
                    .map((n) => parseFloat(n))
                    .filter((n) => !isNaN(n))
                    .sort((a, b) => a - b);

            return series;
        },
    },
}

export default Database;