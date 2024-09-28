import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Recent = () => {
    const navigate = useNavigate();

    const recipes = [
        {
            id: 1,
            name: "Spaghetti Carbonara",
            img: "https://images.unsplash.com/photo-1586428008900-4eaf4a9b5ee9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDh8fHByb2ZpbGV8ZW58MHx8fHwxNjg1NTcwNzU4&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
            id: 2,
            name: "Chicken Tikka Masala",
            img: "https://images.unsplash.com/photo-1597110628433-1e433d3e5c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNoaWNrZW58ZW58MHx8fHwxNjg1NTcwNzc0&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
            id: 3,
            name: "Beef Stroganoff",
            img: "https://images.unsplash.com/photo-1597110628433-1e433d3e5c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJlZWZ8ZW58MHx8fHwxNjg1NTcwNzc0&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
            id: 4,
            name: "Vegetable Stir Fry",
            img: "https://images.unsplash.com/photo-1571642891395-004f3b9c0d44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHZlZ2V0YWJsZSUyMHN0aXJ8ZW58MHx8fHwxNjg1NTcwNzc0&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
            id: 5,
            name: "Tacos",
            img: "https://images.unsplash.com/photo-1551621928-028dca2043f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fHRhY29zfGVufDB8fHx8MTY4NTU3MDc4Nw&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
            id: 6,
            name: "Chocolate Cake",
            img: "https://images.unsplash.com/photo-1512058567655-3f19ae0a5f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDYzfHxjaG9jb2xhdGV8ZW58MHx8fHwxNjg1NTcwNzg2&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
            id: 7,
            name: "Sushi",
            img: "https://images.unsplash.com/photo-1605754967093-0f64d08f39c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fHN1c2hpfGVufDB8fHx8MTY4NTU3MDc5Nw&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
            id: 8,
            name: "Pancakes",
            img: "https://images.unsplash.com/photo-1600280747158-b74667f0ebff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDg0fHwwfDB8fHx8MTY4NTU3MDc5OQ&ixlib=rb-1.2.1&q=80&w=400",
        },
    ];

    const users = [
        {
            id: 43128188132,
            name: "Violet Moore",
            img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
        },
        {
            id: 174119235182,
            name: "Beatrice Soto",
            img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
        },
        {
            id: 13242143,
            name: "Mittie Steele",
            img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
        },
        {
            id: 171544119,
            name: "Herbert McLaughlin",
            img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
        },
        {
            id: 55191,
            name: "Martha Parker",
            img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
        },
        {
            id: 922494,
            name: "Kyle Young",
            img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
        },
        {
            id: 71241,
            name: "Sophia Brown",
            img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
        },
        {
            id: 44231,
            name: "Liam Johnson",
            img: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
        },
    ];

    return (
        <div className="w-full">
            <div className="w-4/5 my-5 bg-black/10 shadow-md rounded-3xl overflow-hidden relative hidden lg:flex items-center justify-center flex-col text-white">
                <span className="w-full px-5 font-bold text-xl flex items-center justify-start my-2">
                    Popular Recipes
                </span>

                {recipes.map((item) => {
                    return (
                        <div key={item.id} className="w-full px-5">
                            <span className="w-full h-16 bg-gray-900 rounded-lg shadow-lg my-2 flex items-start justify-center flex-col">
                                <span className="w-full flex items-center justify-evenly p-1 relative">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-10 h-10 border-2 border-gray-300 mx-1 rounded-lg cursor-pointer"
                                        onClick={() => navigate(`recipe/${item.id}`)}
                                    />
                                    <h1
                                        className="text-xs text-gray-300 font-semibold cursor-pointer"
                                        onClick={() => navigate(`recipe/${item.id}`)}
                                    >
                                        {item.name}
                                    </h1>
                                    <RxCross2 className="text-white cursor-pointer" />
                                </span>
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="w-4/5 my-5 bg-black/10 shadow-md rounded-3xl overflow-hidden relative hidden lg:flex items-center justify-center flex-col text-white">
                <span className="w-full px-5 font-bold text-xl flex items-center justify-start my-2">
                    Popular Users
                </span>

                {users.map((item) => {
                    return (
                        <div key={item.id} className="w-full px-5">
                            <span className="w-full h-16 bg-gray-900 rounded-lg shadow-lg my-2 flex items-start justify-center flex-col">
                                <span className="w-full flex items-center justify-evenly p-1 relative">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-10 h-10 border-2 border-gray-300 mx-1 rounded-lg cursor-pointer"
                                        onClick={() => navigate(`userProfile/${item.id}`)}
                                    />
                                    <h1
                                        className="text-xs text-gray-300 font-semibold cursor-pointer"
                                        onClick={() => navigate(`userProfile/${item.id}`)}
                                    >
                                        {item.name}
                                    </h1>
                                    <button className="bg-yellow-300 font-semibold text-xs text-gray-700 px-3 py-1 my-1 rounded-xl">
                                        Follow
                                    </button>
                                    <RxCross2 className="text-white cursor-pointer" />
                                </span>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Recent;
