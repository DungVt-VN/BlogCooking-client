import Footer from "../../layout/Footer";

const Home = () => {
  return (
    <div className="h-[calc(100vh-64px)] bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700/20 relative overflow-auto mb-10">
      <div className="flex justify-center items-center">Login</div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
