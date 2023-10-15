"use client";
import { useRouter } from "next/navigation";
import useSWR from "swr"
import { createElement } from "react";
import MangaReaderChoices from "/components/MangaReaderChoices"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MangaControlBar({ id, chap }) {
    const router = useRouter()
    var { data, error, isLoading } = useSWR('/api/manga/' + id + '/chapters/', fetcher);

    if (!data) return <div>Loading</div>

    var list = data.list.map(element => {
      return createElement("option", {
        key: element.id,
        chapter: element.id
      }, "Bölüm " + element.id + " - " + element.name)
    })

    function handleOnChange(e) {
        var elm = e.target.options[e.target.selectedIndex]
        router.push("/manga/" + id + "/chapter/" + elm.getAttribute("chapter"))
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

    return (
      <div className="flex w-full justify-center">
            <div>
              <a
                onClick={handlePrev}
                className="hidden lg:flex items-center w-max inline-flex cursor-pointer group rounded-lg border border-transparent px-4 py-3 transition-colors hover:bg-neutral-800/30"
              >
                <h2 className={`text-xl font-semibold`}>
                <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
                  &lt;-
                </span>
                {' '}Önceki
              </h2>
              </a>
            </div>

            <div className='lg:ml-10 lg:mr-10 block lg:flex items-center w-full'>
              <MangaReaderChoices className="bg-zinc-800/30 border-neutral-800 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-neutral-800 placeholder-gray-900 text-white focus:ring-blue-500 focus:border-blue-500"/>
              <select id="chapterSelect" onChange={handleOnChange} value={chap} className="bg-zinc-800/30 border-neutral-800 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-neutral-800 placeholder-gray-900 text-white focus:ring-blue-500 focus:border-blue-500">
                {list}
              </select>
            </div>

            <div>
              <a
                onClick={handleNext}
                className="hidden lg:flex items-center w-max inline-flex cursor-pointer group rounded-lg border border-transparent px-4 py-3 transition-colors hover:bg-neutral-800/30"
              >
                <h2 className={`text-xl font-semibold`}>
                  Sonraki{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </a>
            </div>
      </div>
    )
  }