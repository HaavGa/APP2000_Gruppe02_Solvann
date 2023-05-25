const WaterReservoir = ({ waterLevel }) => {
  return (
    <div className="relative h-80 w-52 overflow-hidden rounded-lg border-2 border-black bg-white">
      <div
        className="absolute bottom-0 w-full bg-blue-500"
        style={{ height: `${waterLevel}%` }}
      ></div>
      <div className="absolute bottom-[80%] z-10 h-[2px] w-full bg-black"></div>
      <div className="absolute bottom-[50%] z-10 h-[2px] w-full bg-black"></div>
    </div>
  );
};

export default WaterReservoir;
