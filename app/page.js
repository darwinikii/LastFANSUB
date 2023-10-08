"use client";
import NovelCard from "/components/NovelCard"
import Nav from "../components/Nav"
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {

  function useData(type) {
    var { data, error, isLoading } = useSWR('/api/novel/' + type, fetcher);
    if (!data || isLoading) data = { novels: [] }

    var list = []
    data.novels.forEach(element => {
      list.push(NovelCard({
        name: element.name,
        image: element.image,
        id: element.id,
        type: element.type
      }))
    });

    return list
  }

  var newlyAdded = useData("newlyAdded")
  var suggest = useData("suggest")
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 overflow-x-hidden">
      <Nav className='left-0 top-0 z-10 w-full items-center justify-between font-mono text-sm lg:flex'/>

      <div className="flex flex-col items-center max-w-full">
        <h2 className="mt-10 mb-5 text-4xl font-semibold">
          Yeni Eklenenler
        </h2>
        <div className="mb-5 m-50 grid grid-cols-2 lg:grid-cols-4 border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 dark:bg-zinc-800/30">
          {newlyAdded}
        </div>
        <h2 className="mt-2 mb-5 text-4xl font-semibold">
            Önerilenler
        </h2>
        <div className="mb-5 m-50 grid grid-cols-2 lg:grid-cols-4 border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 dark:bg-zinc-800/30">
          {suggest}
        </div>
      </div>
      

      <div className="hidden mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        TODO
      </div>
    </main>
  )
}
