import Post from "../components/Post"
import Recent from "../components/Recent"

const Home = () => {
    return (
        <div className="h-[calc(100vh-48px)] flex overflow-scroll mb-10">
            <div className="w-full lg:w-[75%] h-full flex justify-center p-5">
                <Post />
            </div>
            <div className="flex-1 hidden lg:block">
                <Recent />
            </div>
        </div>
    )
}

export default Home