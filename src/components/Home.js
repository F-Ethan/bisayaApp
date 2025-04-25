import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { name } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">
        Welcome, {name || "Learner"}!
      </h1>
      <div className="grid grid-cols-1 gap-6">
        <Link to="/learn">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-2xl hover:bg-green-700">
            Learn
          </button>
        </Link>
        <Link to="/settings">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-2xl hover:bg-blue-700">
            Settings
          </button>
        </Link>
        <Link to="/related-apps">
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg text-2xl hover:bg-purple-700">
            Related Apps
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
