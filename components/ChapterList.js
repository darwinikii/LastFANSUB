"use client";
import Link from 'next/link';
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ChapterList({ className, id, vol }) {
  var { data, error, isLoading } = useSWR('/api/novel/' + id + '/volumes/' + vol, fetcher);
  if (!data || isLoading) data = { 
    basicList: [],
    chapterList: []
  }

  const list = data.chapterList.map((chapter, index) =>
    <Link key={data.basicList[index]} volume={data.basicList[index].split("-")[0]} chapter={data.basicList[index].split("-")[1]} href={"/novel/" + id + "/volume/" + data.basicList[index].split("-")[0] + "/chapter/" + data.basicList[index].split("-")[1]} className="cursor-pointer mt-1 mb-1">
      <li volume={data.basicList[index].split("-")[0]} chapter={data.basicList[index].split("-")[1]}>
        {chapter}
      </li>
    </Link>
  );

  return (
        <ul className={className}>
            {list}
        </ul>
  )
} 