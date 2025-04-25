import { Link } from "react-router-dom";

function RelatedApps() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Related Apps</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg text-lg">
        <p className="mb-4">Explore other fun learning apps for kids:</p>
        <ul className="list-disc pl-6">
          <li>Duolingo ABC: Learn reading and writing.</li>
          <li>Khan Academy Kids: Free educational games.</li>
          <li>Lingokids: Language and math for preschoolers.</li>
        </ul>
        <Link to="/home">
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-blue-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RelatedApps;
