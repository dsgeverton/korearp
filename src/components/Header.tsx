

export const Header = () => {
    return (
        <header className={`flex h-[160px] relative  py-4 px-2 gap-4 justify-center items-center`}>
            <div className="absolute w-full h-full bg-wallpaper bg-no-repeat bg-cover blur-sm z-0"></div>
            <figure className="flex left-4 z-10">
                <img className="w-[128px] rounded-full"
                    src="https://media.discordapp.net/attachments/1043231667361423400/1044303472884981810/Sem_Titulo-10.png"
                    alt="Infinity Roleplay" />

                <img className="w-[128px] -ml-6 animate-spin" src="https://cdn-icons-png.flaticon.com/512/3909/3909425.png" alt="KOREIA" />

            </figure>
            <div className="text-white text flex justify-end flex-col items-end leading-7 z-10">
                <h1 className="text-[48px] font-extrabold shadow-xl border p-3">FAMÍLIA KOREA</h1>
                <span className="tracking-tighter font-bold text-[#4333A6]">INFINITY ROLEPLAY</span>
            </div>
        </header>
    )
}