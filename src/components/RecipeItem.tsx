import { useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

const   RecipeItem = () => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLikeClick = () => {
        if (liked) {
            setLiked(false);
        } else {
            setLiked(true);
            setDisliked(false);
        }
    };

    const handleDislikeClick = () => {
        if (disliked) {
            setDisliked(false);
        } else {
            setDisliked(true);
            setLiked(false);
        }
    };

    return (
        <div className="w-[400px] h-auto bg-gray-600 m-4 p-4 rounded">
            <div className="flex flex-row justify-around mb-2">
                <h2 className="w-[70%] line-clamp-2 text-[18px] leading-tight font-bold text-red-600 cursor-pointer hover:text-red-400">Recipe Name asdfj saf sdf safdsadf safsa f sd fsa f sf sf s sf  sf asf </h2>
                <p className="text-gray-400">21-06-2002</p>
            </div>
            <div className="relative cursor-pointer">
                <img
                    src="https://cookshare.net/wp-content/uploads/2024/02/img_4365.jpeg?w=720&h=426&crop=1"
                    alt="Recipe Image"
                    className="w-full h-auto rounded-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 rounded-md"></div>
            </div>

            <div className="flex mt-2 place-content-between items-center">
                <div className="flex p-2 pr-5">
                    <div onClick={handleLikeClick} className="cursor-pointer mr-2">
                        {liked ? (
                            <BiSolidLike className="text-red-500 text-2xl hover:[font-size:26px]" />
                        ) : (
                            <BiLike className="text-gray-300 text-2xl hover:[font-size:26px]" />
                        )}
                    </div>
                    <p>45N</p>
                    <div className="border-[1px] mx-4 border-gray-400 h-6"></div>
                    <div onClick={handleDislikeClick} className="cursor-pointer mr-2">
                        {disliked ? (
                            <BiSolidDislike className="text-red-500 text-2xl hover:[font-size:26px]" />
                        ) : (
                            <BiDislike className="text-gray-300 text-2xl hover:[font-size:26px]" />
                        )}
                    </div>
                    <p>45N</p>
                </div>
                <div>3 Comment</div>
            </div>
            <div className="w-full border-[1px] border-gray-300 rounded-xl"></div>
            <div className="mt-4">
                <p className="text-gray-200 line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum...
                </p>
                <a href="#" className="text-blue-500 hover:underline">Xem thêm</a>
            </div>
        </div>
    );
}

export default RecipeItem;
