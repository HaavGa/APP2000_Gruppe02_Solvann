import WaterChart from "../components/charts/WaterChart";
import PowerpriceChart from "../components/charts/PowerpriceChart";

const Grafer = () => {
  return (
    <div className="bg-gray-700 py-5 text-center text-white">
      <h1 className="text-4xl">Grafer</h1>
      <h2 className="mt-2 mb-2 text-xl">
        OBS! Dummy-grafer, ikke tall fra API'et. Reagerer heller ikke på valgt
        dato foreløpig.
      </h2>
      {/* <div className="mt-14 h-8 items-center flex flex-row justify-center">
        <p className="px-4 text-lg">Velg graf:</p>
        <button className="bg-white text-black">
          Dropdown inn her
        </button>
      </div> */}
      p-2 rounded
      <div className="pt-5">
        <WaterChart />
      </div>
      <div className="pt-5">
        <PowerpriceChart />
      </div>
    </div>
  );
};

export default Grafer;
