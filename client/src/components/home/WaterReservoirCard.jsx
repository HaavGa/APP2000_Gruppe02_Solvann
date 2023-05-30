const WaterReservoirCard = ({
  waterLevel,
  waterOut,
  waterIn,
  totalChange,
  moneyEarned,
  environmentCost,
}) => {
  return (
    <div className="h-80 w-64 rounded-xl bg-white p-4 shadow-xl">
      <h1 className="text-center text-2xl font-bold text-gray-700">
        Vannreservoar
      </h1>
      <div className="my-2 h-[2px] w-full bg-gray-700"></div>
      <div className="grid grid-cols-2 gap-y-1 text-lg">
        <h2>Nivå:</h2>
        <p className="text-right">{waterLevel.toFixed(2)} m</p>
        <h2>Vann inn:</h2>
        <p className="text-right">{waterIn.toFixed(2)} m3/s</p>
        <h2>Vann ut:</h2>
        <p className="text-right">{waterOut.toFixed(2)} m3/s</p>
        <h2>Sum inn/ut:</h2>
        <p className="text-right">{(totalChange / 3600).toFixed(2)} m3/s</p>
        <div className="col-span-2 my-1 h-[1px] w-full bg-gray-700"></div>
        <h2 className="text-sm">Miljøkostnader:</h2>
        <p className="text-right text-sm">{environmentCost.toFixed(0)} kr</p>
        <h2 className="text-sm">Penger tjent:</h2>
        <p className="text-right text-sm">{moneyEarned.toFixed(0)} kr</p>
      </div>
    </div>
  );
};

export default WaterReservoirCard;
