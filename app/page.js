import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('/components/Nav'))
const Search = dynamic(() => import('../components/Search'))
const Tags = dynamic(() => import('../components/Tags'))
const Types = dynamic(() => import('../components/Types'))
const NewlyAdded = dynamic(() => import('../components/NewlyAdded'))
const Breadcrumb = dynamic(() => import('../components/Breadcrumb'))

export default function Page() {

  return (
    <main 
    className='w-full max-w-screen-2xl rounded-3xl xl:m-16 flex flex-col items-center'
    >
      <Breadcrumb/>
      <Nav
        className="flex flex-col xl:flex-row w-full xl:w-11/12 justify-between bg-gray-950 xl:rounded-3xl xl:m-10 p-8 drop-shadow-xl"
      />
      <div className='flex flex-col justify-center my-5 xl:m-16 w-11/12'>
        <Search
          className="flex w-full rounded-3xl bg-white mb-5 drop-shadow-xl"
        />

        <Tags
          className="w-full grid grid-cols-2 xl:grid-cols-5 gap-4 mb-10"
        />

       <Types
         className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10 drop-shadow-2xl"
       />

       <NewlyAdded
        className="w-full rounded-3xl drop-shadow-xl"
       />
      </div>
    </main>
  )
}
