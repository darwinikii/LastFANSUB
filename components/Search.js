export default function Search({ className, value }) {
  return (
    <form action="/search" className={className}>
      <input defaultValue={value} type="search" name="q" id="q" className="block w-full rounded-3xl p-5" placeholder="Search" required />
      <div className="relative">
        <button className="w-8 h-8 absolute right-4 top-4" aria-label="Submit" type='submit'>
          <svg className="text-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </button>
      </div>
    </form>
  )
}