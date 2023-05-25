const WaterReservoirCard = ({ waterLevel }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-80 w-64 rounded-xl bg-white p-6 shadow-xl">
        <h1 className="text-center text-2xl font-bold text-gray-700">
          Water reservoir
        </h1>
        <div className="mb-4 mt-2 h-[2px] w-full bg-gray-700"></div>
        <div className="grid grid-cols-2 grid-rows-4 gap-y-1 text-lg">
          <h2>Level:</h2>
          <p className="text-right">{waterLevel / 2} m</p>
          <h2>Water in:</h2>
          <p className="text-right">9 m3/s</p>
          <h2>Water out:</h2>
          <p className="text-right">40 m3/s</p>
        </div>
      </div>
    </div>
  );
};

export default WaterReservoirCard;
