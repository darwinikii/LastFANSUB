"use client"
import { useRouter } from "next/navigation";
import Search from '../components/Search'
import Image from 'next/image'
import useSWR from 'swr'
import { createElement } from "react";

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

  var list = [];

  data.chapterList.forEach((element, index) => {
    var e = createElement("li", {
      key: data.basicList[index],
      volume: data.basicList[index].split("-")[0],
      chapter: data.basicList[index].split("-")[1]
    }, element)
    var div = createElement("div", {
      className: "cursor-pointer m-2",
      volume: data.basicList[index].split("-")[0],
      chapter: data.basicList[index].split("-")[1],
      onClick: readChapter,
    }, e)
    list.push(div)
  });

  return (
        <ul className="list-disc ml-4">
            {list}
        </ul>
  )
} 