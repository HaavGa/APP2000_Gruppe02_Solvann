import { Link } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

const MinSide = () => {
  const signOut = useSignOut();

  return (
    <div className="h-screen bg-gray-700 py-5 text-center text-white">
      <h1 className="text-4xl">Min side</h1>
      <Link to="/">
        <button
          className="btn bg-red-600 hover:bg-red-700"
          onClick={() => signOut()}
        >
          Logg ut
        </button>
      </Link>

      {/* Må finne ut hvor knappen skal være. Her eller på navbar? */
      /* Redirect til innlogging når knappen trykkes? */}
    </div>
  );
};

export default MinSide;
