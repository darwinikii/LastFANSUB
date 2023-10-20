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
      <Link href={"/manga/" + id + "/chapter/" + chapterID} className="p-2 flex mt-2 mb-2 cursor-pointer hover:backdrop-blur-2xl hover:border-neutral-800 hover:bg-zinc-800/30 hover:from-inherit hover:rounded-xl hover:bg-gray-200 hover:bg-zinc-800/30">
        <Image
          priority={true}
          src={data.image}
          desktopSize={[160, 240]}
          mobileSize={[144, 208]}
          alt='Logo'
          className="self-center w-36 h-52 md:w-40 md:h-60"
        />
        <div className="ml-2 mr-2 lg:ml-10 lg:mr-10">
          <h2 className="flex ml-1 mt-2 text-lg lg:text-3xl font-semibold">
            {"Bölüm " + data.id + " - " + data.name}
          </h2>
          { data["secName"] != "" ? <h3 className="ml-1 mt-2 text-2xs lg:text-xl font-medium text-gray-300">{data.secName}</h3> : "" }
          <h3 className="flex ml-1 mt-4 text-2xs lg:text-xl font-normal">
            Sayfa Sayısı: <a className="ml-2 font-semibold">{data["pages"].length}</a>
          </h3>
          { data["arc"] ? <h3 className="flex ml-1 mt-4 text-2xs lg:text-xl font-normal">Arc: <a className="ml-2 font-medium truncate overflow-hidden">{data["arc"]}</a></h3> : ""}
        </div>
      </Link>
    )
  }