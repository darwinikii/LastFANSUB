"use client";
import { useRouter } from "next/navigation";

export default function NovelControlBarMobile({ id }) {
  const router = useRouter()

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
      <div className="flex w-full">
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
    )
  }