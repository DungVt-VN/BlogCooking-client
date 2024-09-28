import { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import SinglePostModel from "../services/models/SinglePost";

// Dữ liệu mẫu
const mockPosts: SinglePostModel[] = [
  {
    id: "1",
    photoURL: "https://example.com/image1.jpg",
    userID: "user1",
    useEmail: "user1@example.com",
    displayName: "User One",
    disc: "This is a sample post content for user one.",
  },
  {
    id: "2",
    photoURL: "https://example.com/image2.jpg",
    userID: "user2",
    useEmail: "user2@example.com",
    displayName: "User Two",
    disc: "This is a sample post content for user two.",
  }
];

const Post = () => {
  const [posts, setPosts] = useState<SinglePostModel[]>(mockPosts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await new Promise<SinglePostModel[]>((resolve) =>
        setTimeout(() => resolve(mockPosts), 1000)
      );
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full lg:w-4/5 my-5 lg:px-3 py-2 flex items-center justify-center flex-col-reverse">
        <section className="bg-black/20 dark:bg-gray-900 w-full px-5 rounded-2xl">
          <div className="w-full py-10 mx-auto animate-pulse">
            <div className="w-full">
              <h1 className="w-12 h-12 mb-7 bg-gray-700 rounded-3xl dark:bg-gray-700"></h1>
              <div className="w-full h-72 bg-gray-600 rounded-lg dark:bg-gray-600"></div>
              <h1 className="w-36 h-7 mt-7 bg-gray-700 rounded dark:bg-gray-700"></h1>
              <p className="w-full h-10 mt-7 bg-gray-700 rounded-md dark:bg-gray-700"></p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-4/5 my-2 lg:px-3 py-2 flex items-center flex-col">
      {posts.map((item) => (
        <SinglePost key={item.id} {...item} /> // Truyền trực tiếp các thuộc tính của item
      ))}
    </div>
  );
};

export default Post;
