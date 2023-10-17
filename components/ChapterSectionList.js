"use client";
import useSWR from "swr"
import dynamic from 'next/dynamic'

const ChapterSection = dynamic(() => import('/components/ChapterSection'))

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ChapterSectionList({ id }) {
    var { data, error, isLoading } = useSWR('/api/manga/' + id, fetcher);
    if (!data) return

    var list = data["chapters"].map(chapter => 
      ChapterSection({
        id,
        chapterID: chapter.id
      })
    )

    return (
      <div>
        {list}
      </div>
    )
  }