import { useSelector, useDispatch } from "react-redux";
import { updateProgress, setCurrentGame } from "../store/gameSlice";
import ColorGame from "./ColorGame";
import { Link } from "react-router-dom";

function Learn() {
  const { currentGame } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const games = ["colors", "numbers", "dragDrop"];
  const nextGame = () => {
    const currentIndex = games.indexOf(currentGame);
    const nextIndex = (currentIndex + 1) % games.length;
    dispatch(setCurrentGame(games[nextIndex]));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Let's Learn Bisaya!
      </h1>
      {currentGame === "colors" && <ColorGame />}
      {currentGame === "numbers" && (
        <p className="text-lg">Numbers Game (To be implemented)</p>
      )}
      {currentGame === "dragDrop" && (
        <p className="text-lg">Drag-and-Drop Game (To be implemented)</p>
      )}
      <div className="mt-6 flex gap-4">
        <button
          onClick={nextGame}
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-green-700"
        >
          Next Game
        </button>
        <Link to="/home">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-blue-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Learn;
