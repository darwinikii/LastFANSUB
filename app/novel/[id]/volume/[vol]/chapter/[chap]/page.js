"use client";
import { useRouter } from "next/navigation";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import './style.css'
import Nav from "/components/Nav"
import useSWR from "swr"
import { createElement } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page({ params }) {
  function useRetrieveData(url, defaultData) {
    var { data, error, isLoading } = useSWR(url, fetcher);
    if (!data || isLoading) data = defaultData

    return data
  }
  const router = useRouter();

  var data = useRetrieveData('/api/novel/' + params.id + "/volumes/" + params.vol + "/chapters/" + params.chap, {
    id: undefined,
    name: undefined,
    markdown: undefined
  })

  var chapters = useRetrieveData('/api/novel/' + params.id + '/volumes/', { basicList: [], chapterList: [] })

  function handleOnChange(e) {
    var elm = e.target.options[e.target.selectedIndex]
    router.push("/novel/" + params.id + "/volume/" + elm.getAttribute("volume") + "/chapter/" + elm.getAttribute("chapter"))
  }

  function handleNext(e) {
    var selector = document.getElementById("chapterSelect")
    if (!selector.options[selector.selectedIndex + 1]) return alert("Son bölümdesin!")
    var elm = selector.options[selector.selectedIndex]
    elm.nextElementSibling.selected = true
    selector.value = elm.nextElementSibling.innerText
    handleOnChange({
      target: selector
    })
  }

  function handlePrev(e) {
    var selector = document.getElementById("chapterSelect")
    if (!selector.options[selector.selectedIndex - 1]) return alert("İlk bölümdesin!")
    var elm = selector.options[selector.selectedIndex]
    elm.previousElementSibling.selected = true
    selector.value = elm.previousElementSibling.innerText
    handleOnChange({
      target: selector
    })
  }

  var list = []
  chapters.chapterList.forEach((element, i) => {
    var isSelected = chapters.basicList[i].split("-")[0] == params.vol && chapters.basicList[i].split("-")[1] == params.chap
    list.push(createElement("option", {
      selected: isSelected,
      volume: chapters.basicList[i].split("-")[0],
      chapter: chapters.basicList[i].split("-")[1]
    }, element))
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Nav className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'/>

      <div className="w-full max-w-4xl mt-10 flex justify-around border-gray-300 before:-z-20 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            <a
              onClick={handlePrev}
              className="top-2 bottom-2 absolute left-2 inline-flex cursor-pointer group rounded-lg border border-transparent px-4 py-3 transition-colors hover:dark:bg-neutral-800/30"
            >
              <h2 className={`text-xl font-semibold`}>
                <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
                  &lt;-
                </span>
                {' '}Önceki
              </h2>
            </a>

            <div className=''>
              <select id="chapterSelect" onChange={handleOnChange} class="bg-zinc-800/30 dark:border-neutral-800 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-neutral-800 dark:placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {list}
              </select>
            </div>

            <a
              onClick={handleNext}
              className="top-2 bottom-2 absolute right-2 inline-flex cursor-pointer group rounded-lg border border-transparent px-4 py-3 transition-colors hover:dark:bg-neutral-800/30"
            >
              <h2 className={`text-xl font-semibold`}>
                Sonraki{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </a>
      </div>

      <div className="max-w-4xl mt-10 mb-10 m-50 border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Markdown className='markdown' remarkPlugins={[remarkGfm]}>
            { data.markdown }
        </Markdown>
      </div>

      <div className="w-full max-w-4xl mb-10 flex justify-around border-gray-300 before:-z-20 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            <a
              onClick={handlePrev}
              className="top-2 bottom-2 absolute left-2 inline-flex cursor-pointer group rounded-lg border border-transparent px-4 py-3 transition-colors hover:dark:bg-neutral-800/30"
            >
              <h2 className={`text-xl font-semibold`}>
                <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
                  &lt;-
                </span>
                {' '}Önceki
              </h2>
            </a>

            <div className=''>
              <select onChange={handleOnChange} class="bg-zinc-800/30 dark:border-neutral-800 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-neutral-800 dark:placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {list}
              </select>
            </div>

            <a
              onClick={handleNext}
              className="top-2 bottom-2 absolute right-2 inline-flex cursor-pointer group rounded-lg border border-transparent px-4 py-3 transition-colors hover:dark:bg-neutral-800/30"
            >
              <h2 className={`text-xl font-semibold`}>
                Sonraki{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </a>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the Next.js 13 playground.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
