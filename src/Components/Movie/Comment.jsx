import { memo } from "react"

function Comment ({e}) {
    return (
        <div className="bg-[#333335] w-fit flex gap-4 py-3 pl-4 pr-10  text-gray-400 rounded-xl my-6" >
            <img className="rounded-full h-10 my-auto" src="https://mymoonlight.vercel.app/defaultAvatar.jpg" alt="" />
            <div>
                <h1 className="text-white text-lg">{e.name}</h1>
                <h1>{e.comment}</h1>
            </div>
        </div>
    )
}

export default memo(Comment)