import { memo, useEffect, useState } from "react"
import { GetAPI } from "../../API/ContextAPI"
import RenderList from "./RenderList"

function TvShow ({handleSwitchPage, strSort, strFilter}) {

    const {getDiscover} = GetAPI()

    const [page, setPage] = useState(1)
    const [list, setList] = useState([])

    const encodeStrSort = (str) => {
        let res = ''
        switch (str) {
            // case 'Choose your option':
            //     res = 'popularity.desc'
            //     break
            case 'Most popular':
                res = 'popularity.desc'
                break
            case 'Most recent':
                res = 'first_air_date.desc'
                break 
            case 'Most rating':
                res = 'vote_average.desc'
                break 
            default:
                console.log('strSort error')
        }

        return res
    }

    useEffect (() => {
        getDiscover ('tv', encodeStrSort(strSort), strFilter, page)
            .then (res => {
                res = res.results.filter (e => (e.poster_path !== null && e.poster_path != undefined))
                if (page == 1) {
                    setList(res)
                } else {
                    setList (pre => [...pre, ...res])
                }
            })
    }, [page, strFilter, strSort])

    const handleScrollEvent = (e) => {
        if (e.target.documentElement.scrollTop + window.innerHeight + 4 >= e.target.documentElement.scrollHeight) {
            setPage (pre => (pre + 1))          
        }
    }

    useEffect (() => {

        window.addEventListener ('scroll', handleScrollEvent)

        return () => {
            setPage (1)
            window.removeEventListener('scroll', handleScrollEvent)
        }
    }, [strFilter, strSort])

    return (
        <div className="px-4 text-gray-400 w-full min-h-screen">
            <div className="flex text-lg">
                <h1 className="text-white cursor-pointer">TV Show</h1>
                <h1 onClick={handleSwitchPage} className="ml-10 text-gray-400 cursor-pointer">Movie</h1>
            </div>

            <div className="mt-6">
                <RenderList list={list} type='tv' />
            </div>
        </div>
    )
}

export default memo(TvShow)