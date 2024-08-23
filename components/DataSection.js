"use client";
import Link from 'next/link';
import dynamic from 'next/dynamic'
import useSWR from "swr"

const Image = dynamic(() => import('../components/Image'))

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DataSection({ className, style, id, vol, type }) {
  function useFetch(url) {
    var req = useSWR(url, fetcher);
    return req
  }

  if (vol != undefined) var url = '/api/' + type + '/' + id + '/volumes/' + vol
  else var url = '/api/' + type + '/' + id

  var { data, error, isLoading } = useFetch(url)
  if (!data) return <div>Yükleniyor</div>

  if (data["genre"]) var list = data["genre"].map((e, i) => {
    return (
      <Link key={i} href={'/search?q=' + e}>
        {e + (data["genre"].length > i + 1 ? ", " : "")}
      </Link>
    )
  })

  if (vol == undefined) return (
    <div className={className} style={style}>
      <Image
        priority={true}
        desktopSrc={data.image}
        desktopSize={[256, 384]}
        mobileSize={[144, 208]}
        alt='Logo'
        className="mx-5 rounded-lg"
      />
      <div className="flex flex-col justify-between mx-1 w-full">
        <div className='flex flex-col'>
          <h2 className="flex text-4xl font-semibold">
            {data["names"][0]}
            <h3 className="my-2 text-xl font-medium text-gray-300">{"(" + data.type + ")"}</h3>
          </h2>
          {
            data["names"]
              .slice(1, data["names"].length)
              .map((e, i) => (<h3 key={i} className="my-2 text-xl font-medium text-gray-300">{e}</h3>))
          }
          <h3 className="flex my-2 text-xl font-normal">
            Yazar: <a href={data["author"]["URL"]} className="ml-2 font-semibold">{data["author"]["name"]}</a>
          </h3>
          <h3 className="flex my-2 text-xl font-normal">
            Tür: <a className="mx-2 font-medium text-ellipsis overflow-hidden ">{list}</a>
          </h3>
          <h3 className="flex my-2 text-xl font-normal">
            Durum: <a className="mx-2 font-medium truncate overflow-hidden">{data["status"]}</a>
          </h3>
          {data["translator"] ? <h3 className="flex my-2 text-xl font-normal">Çeviren: <a className="mx-2 font-medium truncate overflow-hidden">{data["translator"]}</a></h3> : ""}
        </div>
        <div className="flex justify-end">
          <Link
            href={'/' + type + '/' + data.id + "/read"}
            className="inline-flex cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-neutral-800"
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
  else return (
    <div className={className} style={style}>
      <Image
        priority={true}
        desktopSrc={data.image}
        desktopSize={[256, 384]}
        mobileSize={[144, 208]}
        alt='Logo'
        className="self-center ml-4 mb-2 mt-2 w-36 h-52 md:w-64 md:h-96"
      />
      <div className="ml-10 mr-10">
        <Link href={'/' + type + '/' + id} className="ml-1 mt-2 text-lg lg:text-4xl font-semibold">
          {data["novelData"]["names"][0]}
        </Link>
        <h3 className="ml-1 mt-2 text-xs lg:text-xl font-medium text-gray-300">
          Volume{' ' + data.id}
        </h3>
        <h3 className="flex ml-1 mt-4 text-xs lg:text-xl font-normal">
          Yayın Tarihi: {data["release-date"]}
        </h3>
        <h3 className="flex ml-1 mt-4 text-xs lg:text-xl font-normal">
          Durum: {data.status}
        </h3>
        <h3 className="flex ml-1 mt-4 text-xs lg:text-xl font-normal">

        </h3>
        <div className="absolute bottom-5 right-5">
          <Link
            href={'/' + type + '/' + id + "/volume/" + vol + "/read"}
            className="hidden lg:block inline-flex cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-neutral-800/30"
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