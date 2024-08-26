"use client";
import Markdown from "react-markdown";
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Disqus({ url, callback }) {
    var { data, error, isLoading } = useSWR(url, fetcher);
    if (!data) return <a></a>

    return (
        <Markdown>
            {data[callback]}
        </Markdown>
    )
}