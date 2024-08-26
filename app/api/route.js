export async function GET() {
  const endpoints = {
    novel: {
      base: "/novel",
      "[id]": {
        base: "/novel/[id]",
        volume: {
          base: "/novel/[id]/volume",
          "[vol]": {
            base: "/novel/[id]/volume/[vol]",
            chapter: {
              base: "/novel/[id]/volume/[vol]/chapter",
              "[chap]": "/novel/[id]/volume/[vol]/chapter/[chap]",
              fetch: "/novel/[id]/volume/[vol]/chapter/fetch",
            },
            extend: "/novel/[id]/volume/[vol]/extend",
          },
          extend: "/novel/[id]/volume/extend",
          fetch: "/novel/[id]/volume/fetch"
        },
        extend: "/novel/[id]/extend"
      }
    },
    manga: {
      base: "/manga",
      "[id]": {
        base: "/manga/[id]",
        chapter: {
          base: "/manga/[id]/chapter",
          "[chap]": {
            base: "/manga/[id]/chapter/[chap]",
            pages: "/manga/[id]/chapter/[chap]/pages",
          },
          fetch: "/manga/[id]/chapter/fetch",
        },
        extend: "/manga/[id]/extend"
      }
    },
    newlyAdded: "/newlyAdded",
    search: "/search?q=[query]",
    tags: "/tags"
  }

  return Response.json(endpoints)
}