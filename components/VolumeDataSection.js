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

  var url = `/api/${type}/${id}/volume/${vol}/extend` 
  var { data, error, isLoading } = useFetch(url);
  if (!data) return <div></div>

  return (
    <div className={className} style={style}>
      <div className='flex mx-5'>
        <Image
          priority={true}
          desktopSrc={data["volume"]["image"]}
          desktopSize={[256, 384]}
          mobileSize={[256, 384]}
          alt='Logo'
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col w-full xl:w-auto">
        <Link href={'/' + type + '/' + id} className="flex justify-center xl:justify-start text-lg xl:text-4xl font-semibold">
          {data["serie"]["names"][0]}
        </Link>
        <h3 className="xl:my-2 xl:text-xl font-medium text-gray-300 text-center xl:text-start text-balance">
          Volume{' ' + data["volume"]["id"]}
        </h3>
        <h3 className="flex w-full justify-between xl:justify-start mt-8 my-2 xl:text-xl font-normal">
          Yayın Tarihi: 
          <a className="mx-2">{data["volume"]["release-date"]}</a>
        </h3>
        <h3 className="flex w-full justify-between xl:justify-start my-2 xl:text-xl font-normal">
          Durum:
          <a className="mx-2">{data["volume"]["status"]}</a>
        </h3>
        <div className="absolute bottom-5 right-5">
          <Link
            href={'/' + type + '/' + id + "/volume/" + vol + "/read"}
            className="hidden lg:block inline-flex cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-neutral-700"
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