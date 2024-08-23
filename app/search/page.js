"use client";
import { useRouter } from "next/navigation";
import useSWR from 'swr';
import dynamic from 'next/dynamic'

const SerieCard = dynamic(() => import('/components/SerieCard'))
const Nav = dynamic(() => import('/components/Nav'))
const Search = dynamic(() => import('/components/Search'))
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page({ searchParams }) {
  var { data, error } = useSWR('/api/search?text=' + searchParams["q"], fetcher);

  const router = useRouter()

  if (searchParams["q"] == null) router.push("/")

  if (data == undefined) data = []

  var list = data.map((e, i) => {
    return <SerieCard
      key={i}
      names={e["names"]}
      shortname={e["shortname"]}
      id={e["id"]}
      type={e["type"]}
    />
  })

  return (
    <main className="w-full max-w-screen-2xl rounded-3xl m-16 flex flex-col items-center">
      <Nav
        className="flex w-11/12 justify-between bg-gray-950 rounded-3xl m-10 p-8 drop-shadow-xl"
      />

      <div className='flex flex-col justify-center m-16 w-11/12'>
      <Search
          className="flex w-full rounded-3xl bg-white mb-5 drop-shadow-xl"
          value={searchParams["q"]}
        />
      <div className="w-full rounded-3xl drop-shadow-xl" style={{backgroundColor: "#222"}}>
            <div className='flex w-full justify-center items-center text-3xl font-bold m-6'>
                <h1>Arama Sonuçları</h1>
            </div>
            <div className='grid grid-cols-3'>
                {
                    list
                }
            </div>
        </div>
      </div>
    </main>
  )
}
