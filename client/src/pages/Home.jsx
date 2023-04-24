import ApiData from "../components/ApiData";

const Home = () => {
  return (
    <>
      <div className="grid h-screen grid-cols-1 items-center bg-gray-700 lg:grid-cols-2">
        <ApiData />
        <button className="btn mx-auto bg-red-500 hover:bg-red-600">
          Stopp
        </button>
      </div>
    </>
  );
};

export default Home;
