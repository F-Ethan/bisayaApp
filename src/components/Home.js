import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { name } = useSelector((state) => state.user);
  const [showBisaya, setShowBisaya] = useState(false);

  // Toggle between English and Bisaya every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowBisaya((prev) => !prev);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <style>
        {`
          .card-container {
            perspective: 1000px; /* Creates 3D space for flip effect */
            width: 360px; /* Fixed width for longest greeting */
          }
          .card {
            position: relative;
            width: 100%;
            min-height: 50px; /* Smaller min-height for compact card */
            transform-style: preserve-3d;
            transition: transform 0.8s ease-in-out; /* Smooth flip animation */
          }
          .card.flipped {
            transform: rotateX(180deg); /* Flip vertically to show back */
          }
          .card-front,
          .card-back {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 100%; /* Match card's min-height */
            backface-visibility: hidden; /* Hide back side when not facing */
            display: flex;
            align-items: center;
            justify-content: center;
            background: white; /* Card background */
            border-radius: 12px; /* Rounded corners */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Shadow */
            padding: 12px; /* Compact padding */
            white-space: nowrap; /* Prevent text wrapping */
          }
          .card-back {
            transform: rotateX(180deg); /* Back side is rotated 180deg for vertical flip */
          }
          @media (max-width: 640px) {
            .card-container {
              width: 280px; /* Smaller width on mobile */
            }
            .card-front h1,
            .card-back h1,
            .name-text {
              font-size: 1.875rem; /* text-3xl for smaller screens */
            }
            .title-wrapper {
              flex-direction: column; /* Stack vertically on mobile */
              align-items: center;
            }
            .name-text {
              margin-left: 0; /* Remove inline spacing */
              margin-top: 0.5rem; /* Space below card */
            }
          }
        `}
      </style>
      <div className="title-wrapper flex flex-row items-center mb-8 sm:flex-row">
        <div className="card-container">
          <div className={`card ${showBisaya ? "flipped" : ""}`}>
            <div className="card-front">
              <h1 className="text-4xl font-bold text-purple-600 text-center">
                Welcome
              </h1>
            </div>
            <div className="card-back">
              <h1 className="text-4xl font-bold text-purple-600 text-center">
                Maayong Pag-abot
              </h1>
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-purple-600 ml-2 name-text">
          {name || "Learner"}!
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Link to="/play">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-2xl hover:bg-green-700">
            Play
          </button>
        </Link>
        <Link to="/learn">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-2xl hover:bg-green-700">
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