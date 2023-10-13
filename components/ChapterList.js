"use client"
import { useRouter } from "next/navigation";
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ChapterList({ className, id, vol }) {
  var { data, error, isLoading } = useSWR('/api/novel/' + id + '/volumes/' + vol, fetcher);
  if (!data || isLoading) data = { 
    basicList: [],
    chapterList: []
 }

  const router = useRouter();

  function readChapter(e) {
    router.push("/novel/" + id + "/volume/" + e.target.getAttribute("volume") + "/chapter/" + e.target.getAttribute("chapter"))
  }

  const list = data.chapterList.map((chapter, index) =>
    <div key={data.basicList[index]} volume={data.basicList[index].split("-")[0]} chapter={data.basicList[index].split("-")[1]} onClick={readChapter} className="cursor-pointer m-2">
      <li volume={data.basicList[index].split("-")[0]} chapter={data.basicList[index].split("-")[1]}>
        {chapter}
      </li>
    </div>
  );

  return (
        <ul className="list-disc ml-4">
            {list}
        </ul>
  )
} 