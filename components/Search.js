"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search({ className }) {
    const [searchText, setsearchText] = useState("")
    const router = useRouter();

    function handleClick(e) {
        e.preventDefault();

        if (searchText == "") {
            alert("Arama çubuğu boş olamaz!")
            return
          }
      
          const searchParams = new URLSearchParams();
      
          searchParams.append("q", searchText)
      
          console.log("/search?" + searchParams.toString())

          router.push("/search?" + searchParams.toString())
    }

    return (
        <form className={className}>   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Ara</label>
            <div className="relative">
              <input value={searchText} onChange={(e) => setsearchText(e.target.value)} onSubmit={handleClick} type="search" id="default-search" className="block w-full p-4 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800/30 dark:border-neutral-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ara" required/>
              <button aria-labelledby="Submit" onClick={handleClick} type='submit' className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </button>
            </div>
        </form>
    )
}