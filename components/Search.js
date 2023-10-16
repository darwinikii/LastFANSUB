export default function Search({ className, defaultValue }) {
    return (
        <form action="/search" className={className}>   
          <label htmlFor="q-search" className="mb-2 text-sm font-medium text-gray-900 sr-only text-white">Ara</label>
            <div className="relative">
              <input defaultValue={defaultValue} type="search" name="q" id="q" className="block w-full p-4 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-zinc-800/30 border-neutral-800 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Ara" required></input>
              <button aria-label="Submit" type='submit' className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-500 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </button>
            </div>
        </form>
    )
}