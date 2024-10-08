"use client";
import { useRouter } from "next/navigation";
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NovelControlBarMobile({ className, style, id, vol, chap }) {
  const router = useRouter()
  var { data, error, isLoading } = useSWR('/api/novel/' + id + '/volume/extend', fetcher);

  if (!data) return <div className={className} style={style}></div>

  var list = []

  data.forEach((volume, i) => {
    volume["chapters"].forEach((chapter, j)  => {
      list.push(<option selected={volume["id"] == vol && chapter["id"] == chap} volume={volume["id"]} chapter={chapter["id"]} key={i + j}>{chapter["override"] ? `Cilt ${volume["id"]} ${chapter["override"]}${chapter["name"]}` : `Cilt ${volume["id"]} Bölüm ${chapter["id"]} - ${chapter["name"]}`}</option>)
    });
  });

  function handleOnChange(e) {
    var elm = e.target.options[e.target.selectedIndex]
    router.push("/novel/" + id + "/volume/" + elm.getAttribute("volume") + "/chapter/" + elm.getAttribute("chapter"))
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
      <div className="flex w-full my-1">
        <a
          onClick={handlePrev}
          className="w-full block lg:hidden inline-flex cursor-pointer group rounded-lg border border-transparent px-4 py-3 transition-colors hover:bg-neutral-800/30"
        >
          <h2 className="text-xl font-semibold">
            <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
              &lt;-
            </span>
            {' '}Önceki
          </h2>
        </a>

        <a
          onClick={handleNext}
          className="justify-end w-full block lg:hidden inline-flex cursor-pointer group rounded-lg border border-transparent px-4 py-3 transition-colors hover:bg-neutral-800/30"
        >
          <h2 className="text-xl font-semibold">
            Sonraki{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
      </div>
      <div className="w-full my-1">
        <select id="chapterSelect" onChange={handleOnChange} className="w-full text-gray-900 text-sm rounded-lg p-2.5 placeholder-gray-900 text-white">
          {list}
        </select>
      </div>
    </div>
  )
}