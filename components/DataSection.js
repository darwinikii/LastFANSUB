"use client";
import Image from 'next/image'
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NovelCard({ id }) {
    var { data, error, isLoading } = useSWR('/api/novel/' + id, fetcher);
    if (!data) return

    return (
      <div className="flex">
        <Image
          priority={true}
          src={data.image}
          width={256}
          height={384}
          alt='Logo'
          className="self-center ml-4 mb-2 w-36 h-52 md:w-64 md:h-96"
        />
        <div className="ml-2 mr-2 lg:ml-10 lg:mr-10">
          <h2 className="flex ml-1 mt-2 text-lg lg:text-4xl font-semibold">
            {data.name}
            <h3 className="ml-1 mt-2 text-2xs lg:text-xl font-medium text-gray-300">{"(" + data.type + ")"}</h3>
          </h2>
          <h3 className="ml-1 mt-2 text-2xs lg:text-xl font-medium text-gray-300">
            {data.fullName}
          </h3>
          { data["secName"] != "" ? <h3 className="ml-1 mt-2 text-2xs lg:text-xl font-medium text-gray-300">{data.secName}</h3> : "" }
          <h3 className="flex ml-1 mt-4 text-2xs lg:text-xl font-normal">
            Yazar: <a href={data["author"]["URL"]} className="ml-2 font-semibold">{data["author"]["name"]}</a>
          </h3>
          <h3 className="flex ml-1 mt-4 text-2xs lg:text-xl font-normal">
            Tür: <a className="ml-2 font-medium text-ellipsis overflow-hidden ">{data["genre"].join(", ")}</a>
          </h3>
          <h3 className="flex ml-1 mt-4 text-2xs lg:text-xl font-normal">
            Durum: <a className="ml-2 font-medium truncate overflow-hidden">{data["status"]}</a>
          </h3>
          { data["translator"] ? <h3 className="flex ml-1 mt-4 text-2xs lg:text-xl font-normal">Çeviren: <a className="ml-2 font-medium truncate overflow-hidden">{data["translator"]}</a></h3> : ""}
          
          <div className="flex justify-end mt-10">
            <a
              href={"/novel/" + data.id + "/read"}
              className="hidden lg:block inline-flex cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-neutral-800/30"
            >
              <h2 className={`text-2xl font-semibold`}>
                Oku{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </a>
          </div>
        </div>
      </div>
    )
  }