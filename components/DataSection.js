"use client";
import Link from 'next/link';
import dynamic from 'next/dynamic'
import useSWR from "swr"

const Image = dynamic(() => import('../components/Image'))

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DataSection({ className, style, id, type }) {
  function useFetch(url) {
    var req = useSWR(url, fetcher);
    return req
  }
  var url = '/api/' + type + '/' + id
  var { data, error, isLoading } = useFetch(url)
  if (!data) return <div></div>

  if (data["genre"]) var list = data["genre"].map((e, i) => {
    return (
      <Link key={i} href={'/search?q=' + e}>
        {e + (data["genre"].length > i + 1 ? ", " : "")}
      </Link>
    )
  })

  return (
    <div className={className} style={style}>
      <div className='mx-5'>
        <Image
          priority={true}
          desktopSrc={data.image}
          desktopSize={[256, 384]}
          mobileSize={[256, 384]}
          alt='Logo'
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between w-full xl:w-9/12">
        <div className='flex flex-col items-center xl:items-start'>
          <h2 className="flex items-center xl:items-start xl:text-4xl font-semibold">
            {data["names"][0]}
            <span className="my-1 xl:my-2 xl:text-xl font-medium text-gray-300">{"(" + (data["type"] == 0 ? "Novel" : (data["type"] == 1 ? "Manga" : "")) + ")"}</span>
          </h2>
          {
            data["names"]
              .slice(1, data["names"].length)
              .map((e, i) => (<h3 key={i} className="my-1 xl:my-2 xl:text-xl font-medium text-gray-300 text-center text-balance">{e}</h3>))
          }
          <h3 className="flex w-full xl:w-auto justify-between xl:justify-start mt-8 my-2 xl:text-xl font-normal">
            Yazar: <a href={data["author"]["URL"]} className="ml-2 font-semibold">{data["author"]["name"]}</a>
          </h3>
          <h3 className="flex w-full xl:w-auto justify-between xl:justify-start my-2 xl:text-xl font-normal">
            Tür: <span className="mx-2 font-medium text-ellipsis overflow-hidden ">{list}</span>
          </h3>
          <h3 className="flex w-full xl:w-auto justify-between xl:justify-start my-2 xl:text-xl font-normal">
            Durum: <a className="mx-2 font-medium truncate overflow-hidden">{data["status"]}</a>
          </h3>
          {data["translator"] ? <h3 className="flex w-full justify-between xl:justify-start my-2 xl:text-xl font-normal">Çeviren: <Link href={"/search?q=" + data["translator"]} className="mx-2 font-medium truncate overflow-hidden">{data["translator"]}</Link></h3> : ""}
          <div className="w-full flex block xl:hidden">
            <Link
              href={'/' + type + '/' + data.id + "/read"}
              className="w-full inline-flex justify-center cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-neutral-700"
            >
              <h2 className={`text-2xl font-semibold`}>
                Oku{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </Link>
          </div>
        </div>
        <div className="hidden xl:flex justify-end">
          <Link
            href={'/' + type + '/' + data.id + "/read"}
            className="inline-flex cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-neutral-700"
          >
            <h2 className={`text-2xl font-semibold`}>
              Oku{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  )
}