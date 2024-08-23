"use client";
import Link from 'next/link';
import useSWR from "swr"
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('../components/Image'))

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ChapterSection({ id, chapterID }) {
  var { data, error, isLoading } = useSWR('/api/manga/' + id + "/chapters/" + chapterID, fetcher);
  if (!data) return

  return (
    <Link href={"/manga/" + id + "/chapter/" + chapterID} className="w-full flex p-5">
      <div className='mr-5'>
        <Image
          priority={true}
          desktopSrc={data.image}
          desktopSize={[160, 240]}
          mobileSize={[144, 216]}
          alt='Logo'
          className="rounded-lg"
        />
      </div>
      <div className="w-full">
        <h2 className="flex text-lg lg:text-3xl font-semibold">
          {"Bölüm " + data.id + " - " + data.name}
        </h2>
        {data["secName"] != "" ? <h3 className="text-2xs lg:text-xl font-medium text-gray-300">{data.secName}</h3> : ""}
        <h3 className="flex text-2xs lg:text-xl font-normal">
          Sayfa Sayısı: <a className="ml-2 font-semibold">{data["pages"].length}</a>
        </h3>
        {data["arc"] ? <h3 className="flex text-2xs lg:text-xl font-normal">Arc: <a className="ml-2 font-medium truncate overflow-hidden">{data["arc"]}</a></h3> : ""}
      </div>
    </Link>
  )
}