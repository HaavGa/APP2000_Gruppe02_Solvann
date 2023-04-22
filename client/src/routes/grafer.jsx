import WaterChart from "../components/charts/WaterChart";

const Grafer = () => {
  return (
    <div className="h-screen bg-gray-700 py-5 text-center text-white">
      <h1 className="text-4xl">Grafer</h1>
      <div className="mt-14 h-8 items-center flex flex-row justify-center">
        <p className="px-4 text-lg">Velg graf:</p>
        <button className="bg-white text-black p-2 rounded">
          Dropdown inn her
        </button>
      </div>
      <WaterChart />
      <h2 className="mt-2 mb-2 text-xl">OBS! Dummy-graf, ikke tall fra API'et</h2>
    </div>
  );
};

export default Grafer;
