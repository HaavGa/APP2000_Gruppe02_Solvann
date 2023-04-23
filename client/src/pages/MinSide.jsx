import { Link } from "react-router-dom";

const MinSide = () => {
  return (
    <div className="h-screen bg-gray-700 py-5 text-center text-white">
      <h1 className="text-4xl">Min side</h1>
      <Link to="/">
        <button className="mt-10 rounded-lg bg-red-600 p-2">Logg ut</button>
      </Link>

      {/* Må finne ut hvor knappen skal være. Her eller på navbar? */
      /* Redirect til innlogging når knappen trykkes? */}
    </div>
  );
};

export default MinSide;
