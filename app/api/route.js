export async function GET() {
  var endpoints = {
    novel: {
      search: "/novel/search?text=[query]",
      "[id]": {
        base: "/novel/[id]",
        volumes: {
          base: "/novel/[id]/volumes",
          "[vol]": {
            base: "/novel/[id]/volumes/[vol]",
            chapters: {
              base: "/novel/[id]/volumes/[vol]/chapters",
              "[chap]": "/novel/[id]/volumes/[vol]/chapters/[chap]"
            }
          }
        }
      }
    }
  }

  return new Response(JSON.stringify(endpoints, null, 2))
}