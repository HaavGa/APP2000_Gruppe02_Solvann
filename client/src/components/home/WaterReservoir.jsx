const WaterReservoir = ({ waterLevel, color, setColor }) => {
  const finalWaterlevel = waterLevel * 2;
  finalWaterlevel > 50 && finalWaterlevel < 80
    ? setColor("bg-blue-500")
    : setColor("bg-red-500");

  return (
    <div className="relative h-80 w-64 overflow-hidden rounded-lg border-2 border-black bg-white">
      <div
        className={`absolute bottom-0 w-full ${color}`}
        style={{
          height: `${finalWaterlevel}%`,
        }}
      ></div>
      <div className="absolute bottom-[80%] z-10 h-[2px] w-full bg-black"></div>
      <div className="absolute bottom-[50%] z-10 h-[2px] w-full bg-black"></div>
    </div>
  );
};

export default WaterReservoir;
