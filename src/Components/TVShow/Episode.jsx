import { memo } from "react"

function Episode ({episode, episNum, setEpisNum}) {

    const handleSwitchEpisode = () => {
        setEpisNum (episode.episode_number)
    }

    return (
        <div onClick={handleSwitchEpisode} className={`cursor-pointer flex gap-4 hover:text-white my-6 hover:brightness-75 duration-300 ${episode.episode_number == episNum ? 'text-white' : 'text-gray-400'}`}>
            <h1 className={`${episode.episode_number == episNum ? 'text-blue-500' : 'text-gray-400'} my-auto`}>{episode.episode_number}</h1>
            <img className="w-32 rounded-lg" src={`https://image.tmdb.org/t/p/original${episode.still_path}`} alt="" />
            <h1  className="my-auto cursor-pointer">{episode.name}</h1>
        </div>
    )
}

export default memo(Episode)