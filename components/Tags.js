"use client";
import Link from "next/link";
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Tags({ className }) {
    var { data, error, isLoading } = useSWR('/api/tags/', fetcher);
    if (error) return <div>Hata</div>
    if (!data || isLoading) return <div></div>

    return (
        <div className={className}>
            {data
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .slice(0, 10)
            .map((tag, index) => {
              return (
                <Link
                  href={`/search?q=${tag}`}
                  className={'text-black xl:text-lg xl:block flex justify-center items-center p-4 w-full rounded-3xl truncate ...' + (index >= 6 ? " hidden" : "")}
                  key={index}
                  style={{
                    backgroundColor: "#FCD041"
                  }}
                >
                  {tag}
                </Link>
              )
            })}
        </div>
    )
}