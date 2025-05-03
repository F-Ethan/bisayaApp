import { useState, useEffect } from "react";
import books from "../../data/books";

function BookGame({ onQuestionAnswered }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentBook, setCurrentBook] = useState(null);
  const [animationState, setAnimationState] = useState(""); // For outgoing animation
  const [incomingAnimation, setIncomingAnimation] = useState(""); // For incoming animation

  useEffect(() => {
    if (!books || books.length === 0) {
      console.error("Books array is empty or undefined");
      setCurrentBook(null);
      return;
    }

    const randomBookIndex = Math.floor(Math.random() * books.length);
    const selectedBook = books[randomBookIndex];
    setCurrentBook(selectedBook);
    console.log("Selected book:", selectedBook.title);
  }, []);

  const handleNextPage = () => {
    if (!currentBook) return;

    setAnimationState("turn-right");
    setIncomingAnimation("turn-right-in");
    setTimeout(() => {
      const nextPageIndex = currentPageIndex + 1;
      if (nextPageIndex < currentBook.pages.length) {
        setCurrentPageIndex(nextPageIndex);
      } else {
        if (typeof onQuestionAnswered === "function") {
          onQuestionAnswered();
        }
      }
      setAnimationState("");
      setIncomingAnimation("");
    }, 500); // Match animation duration
  };

  const handlePreviousPage = () => {
    if (!currentBook || currentPageIndex === 0) return;

    setAnimationState("turn-left");
    setIncomingAnimation("turn-left-in");
    setTimeout(() => {
      setCurrentPageIndex(currentPageIndex - 1);
      setAnimationState("");
      setIncomingAnimation("");
    }, 500); // Match animation duration
  };

  if (!currentBook) {
    return <div>Loading...</div>;
  }

  const currentPage = currentBook.pages[currentPageIndex];

  return (
    <div className="relative min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes turnRight {
            0% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
            100% { transform: perspective(1000px) rotateY(-90deg); opacity: 0; }
          }
          @keyframes turnLeft {
            0% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
            100% { transform: perspective(1000px) rotateY(90deg); opacity: 0; }
          }
          @keyframes turnRightIn {
            0% { transform: perspective(1000px) rotateY(90deg); opacity: 0; }
            100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
          }
          @keyframes turnLeftIn {
            0% { transform: perspective(1000px) rotateY(-90deg); opacity: 0; }
            100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in;
          }
          .turn-right {
            animation: turnRight 0.5s ease-out forwards;
          }
          .turn-left {
            animation: turnLeft 0.5s ease-out forwards;
          }
          .turn-right-in {
            animation: turnRightIn 0.5s ease-in forwards;
          }
          .turn-left-in {
            animation: turnLeftIn 0.5s ease-in forwards;
          }
          .book-title {
            font-family: 'Georgia, serif';
            color: #ffffff;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          }
          .book-text {
            font-family: 'Arial, sans-serif';
            color: #ffffff;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
          }
          .page-counter {
            font-family: 'Arial, sans-serif';
            color: #ffffff;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
          }
          .arrow-button {
            transition: background-color 0.2s, transform 0.2s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          }
          .arrow-button:hover {
            background-color: #2563eb;
            transform: scale(1.1);
          }
        `}
      </style>
      {/* Full-width image */}
      <div className={animationState || incomingAnimation}>
        <img
          src={currentPage.image || "/assets/placeholder.png"}
          alt={`Page ${currentPageIndex + 1}`}
          className="w-full h-screen object-cover absolute top-0 left-0 z-0"
        />
      </div>
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-screen p-6">
        {/* Header and page counter */}
        <div className="w-full flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl mb-4 text-center book-title animate-fadeIn">
            {currentBook.title}
          </h1>
          <p className="text-lg sm:text-xl page-counter">
            Page: {currentPageIndex + 1} / {currentBook.pages.length}
          </p>
        </div>
        {/* Spacer */}
        <div className="flex-1"></div>
        {/* Page text */}
        <div className="text-center animate-fadeIn">
          <p className="text-xl sm:text-2xl book-text bg-opacity-50 bg-black p-4 rounded-lg max-w-3xl mx-auto">
            {currentPage.text || "No text available"}
          </p>
        </div>
        {/* Arrow buttons */}
        <button
          onClick={handlePreviousPage}
          className={`absolute left-6 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full arrow-button bg-opacity-90 hover:bg-opacity-100 ${currentPageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentPageIndex === 0}
        >
          ←
        </button>
        <button
          onClick={handleNextPage}
          className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full arrow-button bg-opacity-90 hover:bg-opacity-100 ${currentPageIndex >= currentBook.pages.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default BookGame;