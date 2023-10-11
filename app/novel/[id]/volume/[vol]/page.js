"use client";
import { useRouter } from "next/navigation"; 
import Image from 'next/image'
import Markdown from "react-markdown";
import useSWR from "swr"
import dynamic from 'next/dynamic'

const ChapterList = dynamic(() => import('/components/ChapterList'))
const Nav = dynamic(() => import('/components/Nav'))

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page({ params }) {
  var { data, error, isLoading } = useSWR('/api/novel/' + params.id + "/volumes/" + params.vol, fetcher);
  if (!data || isLoading) data = {
    id: undefined,
    "release-date": undefined,
    synopsis: undefined,
    status: undefined,
    image: undefined,
    novelData: {}
  }
  const router = useRouter();

  function handleRead(e) {
    router.push("/novel/" + params.id + "/volume/" + params.vol + "/read")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 overflow-hidden">
      <Nav className='left-0 top-0 z-10 w-full items-center justify-between font-mono text-sm lg:flex'/>

      <div className="rounded-xl w-full lg:max-w-4xl mt-4 flex border-gray-300 from-zinc-200 lg:pb-6 lg:pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px]">
        <Image
          priority={true}
          src={data.image}
          width={256}
          height={384}
          alt='Logo'
          className="self-center ml-4 mb-2 mt-2 w-36 h-52 md:w-64 md:h-96"
        />
        <div className="ml-10 mr-10">
          <h2 onClick={() => router.push('/novel/' + params.id)} className="cursor-pointer ml-1 mt-2 text-lg lg:text-4xl font-semibold">
            {data.novelData.name}
          </h2>
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
            <a
              onClick={handleRead}
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
      <div className="flex justify-center w-full mt-2">
            <a
              onClick={handleRead}
              className="flex justify-center block lg:hidden w-full inline-flex cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-neutral-800/30"
            >
              <h2 className={`text-2xl font-semibold`}>
                Oku{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </a>
          </div>

      <h2 className="mt-10 mb-5 text-xl lg:text-4xl font-semibold">
        Bölümler
      </h2>
      <div className="max-w-4xl mb-10 flex border-gray-300 from-zinc-200 pb-2 pt-2 lg:pb-6 lg:pt-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static rounded-xl lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 before:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px]">
        <ChapterList
          id={params.id}
          vol={params.vol}
        />
      </div>

      <h2 className="mt-10 mb-5 text-xl lg:text-4xl font-semibold">
        Özet
      </h2>
      <div className="max-w-4xl mb-10 p-4 w-full rounded-lg border-gray-300 from-zinc-200 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px]">
        <Markdown>
          {data.synopsis}
        </Markdown>
      </div>

      <div className="hidden mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        FOOTER TODO
      </div>
    </main>
  )
}
