"use client";
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());
const domain = "https://lastfansub.vercel.app/"

export default function Breadcrumb({ id, type }) {
    const { data, error, isLoading } = useSWR(id ? (type == "novel" ? `/api/novel/${id}/volume/extend` : (type == "manga" ? `/api/manga/${id}/chapter/fetch` : `/api/search?text=+`)) : `/api/search?text=+`, fetcher)
    if (!data) return <div></div>;
    var items = [];

    if (id && type == "novel") {
        data.forEach((vol, i) => {
            vol["chapters"].forEach((chap, j) => {
                items.push({
                    "@type": "ListItem",
                    "position": items.length + 1,
                    "name": `Cilt ${vol["id"]} Bölüm ${chap["id"]} - ${chap["name"]}`,
                    "item": domain + `novel/${id}/volume/${vol["id"]}/chapter/${chap["id"]}`
                });
            })
        })
    }
    else if (id && type == "manga") {
        data.forEach((chap, i) => {
            items.push({
                "@type": "ListItem",
                "position": items.length + 1,
                "name": `Bölüm ${chap["id"]} - ${chap["name"]}`,
                "item": domain + `manga/${id}/chapter/${chap["id"]}`
            });
        });
    } else {
        data.forEach((serie, i) => {
            items.push({
                "@type": "ListItem",
                "position": i + 1,
                "name": serie["names"][0],
                "item": domain + (serie["type"] == 0 ? "novel/" + serie["id"] : (serie["type"] == 1 ? "manga/" + serie["id"] : "")),
            });
        });
    }

    const json = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items
    }
    return (<script type="application/ld+json">
        {JSON.stringify(json, null, 2)}
    </script>)
}