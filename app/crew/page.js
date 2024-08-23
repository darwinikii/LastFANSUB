import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('/components/Nav'))
const Image = dynamic(() => import('/components/Image'))

export default function Page() {
    return (
        <main className="w-full max-w-screen-2xl rounded-3xl m-16 flex flex-col items-center">
            <Nav
                className="flex w-11/12 justify-between bg-gray-950 rounded-3xl m-10 p-8 drop-shadow-xl"
            />
            <div className='flex flex-col justify-center w-11/12'>

                <div className="w-full rounded-3xl p-5" style={{ backgroundColor: "#222" }}>
                    <div className="flex w-full justify-center items-center text-3xl font-bold mb-5">
                        <h1>Ekip</h1>
                    </div>
                    <div className='grid grid-cols-3 gap-5 w-full'>
                        <div className="flex flex-col items-center justify-between rounded-3xl bg-zinc-800 p-5">
                            <Image
                                desktopSrc="https://cdn.discordapp.com/avatars/329880115444056067/de1ab9860ebe102f0f7d69d4330f3c1b.png"
                                alt="Avatar"
                                desktopSize={[256, 256]}
                                className="rounded-lg my-5"
                            />
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
                            <Image
                                desktopSrc="https://cdn.discordapp.com/avatars/455101088455196683/eec2675af2bc1163195536992fee4cf0.png"
                                alt="Avatar"
                                desktopSize={[256, 256]}
                                className="rounded-lg my-5"
                            />
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
                            <Image
                                desktopSrc="https://cdn.discordapp.com/avatars/888423110435557407/fa19e5e5d78a1a9a0e178cb970960d95.png"
                                alt="Avatar"
                                desktopSize={[256, 256]}
                                className="rounded-lg my-5"
                            />
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
