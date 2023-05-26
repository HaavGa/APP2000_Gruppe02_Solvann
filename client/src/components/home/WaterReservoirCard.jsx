const WaterReservoirCard = ({ waterLevel }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-68 h-70 rounded-xl bg-white p-4 shadow-xl">
        <h1 className="text-center text-2xl font-bold text-gray-700">
          Vannreservoar
        </h1>
        <div className="my-2 h-[2px] w-full bg-gray-700"></div>
        <div className="grid grid-cols-2 gap-y-1 text-lg">
          <h2>Level:</h2>
          <p className="text-right">{waterLevel / 2} m</p>
          <h2>Vann inn:</h2>
          <p className="text-right">9 m3/s</p>
          <h2>Vann ut:</h2>
          <p className="text-right">40 m3/s</p>
          <h2>Sum inn/ut:</h2>
          <p className="text-right">-31 m3/s</p>
          <div className="col-span-2 my-1 h-[1px] w-full bg-gray-700"></div>
          <h2>Miljøkostnader:</h2>
          <p className="text-right">-1234078 kr</p>
          <h2>Penger tjent:</h2>
          <p className="text-right">3784334 kr</p>
        </div>
      </div>
    </div>
  );
};

export default WaterReservoirCard;
