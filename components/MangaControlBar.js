"use client";
import { useRouter } from "next/navigation";
import useSWR from "swr"
import MangaReaderChoices from "/components/MangaReaderChoices"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MangaControlBar({ className, style, id, chap }) {
  const router = useRouter()
  var { data, error, isLoading } = useSWR('/api/manga/' + id + '/chapter/fetch', fetcher);

  if (!data) return <div>Loading</div>

  const list = data.map((chapter, i) => (<option selected={chapter["id"] == chap} key={i} chapter={chapter["id"]}>{"Bölüm " + chapter["id"] + " - " + chapter["name"]}</option>))

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
    <div className={className} style={style}>
        <a
          onClick={handlePrev}
          className="flex items-center p-4 cursor-pointer group rounded-lg border border-transparent transition-colors hover:bg-neutral-700"
        >
          <h2 className="text-xl font-semibold">
            <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
              &lt;-
            </span>
            {' '}Önceki
          </h2>
        </a>

      <div className='w-8/12 flex justify-center items-center'>
        <MangaReaderChoices className="w-full mx-2.5 text-gray-900 text-sm rounded-lg block p-2.5 placeholder-gray-900 text-white" />
        <select id="chapterSelect" onChange={handleOnChange} className="w-full mx-2.5 text-gray-900 text-sm rounded-lg block p-2.5 placeholder-gray-900 text-white">
          {list}
        </select>
      </div>

        <a
          onClick={handleNext}
          className="flex items-center p-4 cursor-pointer group rounded-lg border border-transparent transition-colors hover:bg-neutral-700"
        >
          <h2 className="text-xl font-semibold">
            Sonraki{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
    </div>
  )
}