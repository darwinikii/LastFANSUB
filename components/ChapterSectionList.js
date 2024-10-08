"use client";
import useSWR from "swr"
import dynamic from 'next/dynamic'

const ChapterSection = dynamic(() => import('/components/ChapterSection'))

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ChapterSectionList({ classname, id }) {
    var { data, error, isLoading } = useSWR('/api/manga/' + id + "/chapter", fetcher);
    if (!data) return

    var list = data.map(chapter => 
      ChapterSection({
        id,
        chapterID: chapter
      })
    )

    return (
      <div className={classname}>
        {list}
      </div>
    )
  }