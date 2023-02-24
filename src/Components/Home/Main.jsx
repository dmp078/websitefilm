import { useCallback, useState } from "react"
import Movie from "./Movie"
import TvShow from "./TvShow"

function Main () {
    //  true == tvshow, else : movie
    const [page, setPage] = useState (true)

    const handleSwitchPage = useCallback (() => {
        setPage (prev => !prev)
    }, [])
    return (
        <div className="text-white md:ml-[260px] lg:mr-[300px] pt-4 px-6 overflow-hidden w-full">
            <div className="flex md:hidden">
                <img src="https://mymoonlight.vercel.app/logo.png" className="h-8" alt="" />
                <div className="flex text-2xl ml-2">
                    <h1 className="text-white">MOON</h1>
                    <h1 className="text-blue-500">LIGHT</h1>
                </div>
            </div>

            <div className="pt-6 w-full">
                {page && <TvShow handleSwitchPage={handleSwitchPage} />}
                {!page && <Movie handleSwitchPage={handleSwitchPage} />}
            </div>

        </div>
    )
}

export default Main