"use client";
import Link from 'next/link';
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ChapterList({ className, id, vol }) {
  var { data, error, isLoading } = useSWR('/api/novel/' + id + '/volume/' + vol + '/chapter/fetch', fetcher);
  if (!data || isLoading) data = []

  const list = data.map((chapter, index) =>
    <Link key={index} href={"/novel/" + id + "/volume/" + vol + "/chapter/" + chapter["id"]} className="cursor-pointer p-1 rounded-3xl ease-out duration-300 hover:bg-zinc-900">
      <li>
        {chapter["override"] ? (chapter["override"] + chapter["name"]) : (`Bölüm ${chapter["id"]} - ${chapter["name"]}`)}
      </li>
    </Link>
  ).reverse()

  return (
        <ul className={className}>
          {list}
        </ul>
  )
}