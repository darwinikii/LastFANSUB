import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('/components/Nav'))
const Image = dynamic(() => import('/components/Image'))

export default function Page() {
    return (
        <main className="w-full max-w-screen-2xl rounded-3xl xl:m-16 flex flex-col items-center">
            <Nav
                className="flex flex-col xl:flex-row w-full xl:w-11/12 justify-between bg-gray-950 xl:rounded-3xl xl:m-10 p-8 drop-shadow-xl"
            />
            <div className='flex flex-col justify-center my-5 xl:m-16 w-11/12'>

                <div className="w-full rounded-3xl p-5" style={{ backgroundColor: "#222" }}>
                    <div className="flex w-full justify-center items-center text-3xl font-bold mb-5">
                        <h1>Ekip</h1>
                    </div>
                    <div className='grid grid-cols-1 xl:grid-cols-3 gap-5 w-full'>
                        <div className="flex flex-col items-center justify-between rounded-3xl bg-zinc-800 p-5">
                            <div className='flex flex-col items-center'>
                                <h1 className='text-white text-center font-bold text-3xl'>
                                    chunchun
                                </h1>
                                <h2>
                                    (Çevirmen)
                                </h2>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between rounded-3xl bg-zinc-800 p-5">
                            <div className='flex flex-col items-center'>
                                <h1 className='text-white text-center font-bold text-3xl'>
                                    darwinikii
                                </h1>
                                <h2>
                                    (Geliştirici)
                                </h2>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between rounded-3xl bg-zinc-800 p-5">
                            <div className='flex flex-col items-center'>
                                <h1 className='text-white text-center font-bold text-3xl'>
                                    CoolAhmo
                                </h1>
                                <h2>
                                    (Çevirmen)
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
