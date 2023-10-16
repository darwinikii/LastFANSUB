"use client";
import { useRouter } from "next/navigation";
import Nav from "/components/Nav"
import SerieCard from "/components/SerieCard"
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page({ searchParams }) {
  var { data, error } = useSWR('/api/search?text=' + searchParams["q"], fetcher);

  const router = useRouter()

  if (searchParams["q"] == null) router.push("/")

  if (data == undefined) data = []

  var list = data.map((e, i) => {
    return <SerieCard
      key={i}
      name={e.name}
      image={e.image}
      id={e.id}
      type={e.type}
    />
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 overflow-hidden">
      <Nav searchValue={searchParams["q"]} className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'/>

      <h2 className="mt-10 text-4xl font-semibold">
        Arama Sonuçları
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 border-gray-300 from-zinc-200 p-2 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit rounded-xl border bg-gray-200 bg-zinc-800/30">
        {list}
      </div>
      

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

      </div>
    </main>
  )
}
