import TurbineCard from "../components/home/TurbineCard";
import StopButton from "../components/home/StopButton";
import WaterReservoirCard from "../components/home/WaterReservoirCard";
import Turbine from "../components/home/Turbine";
import WaterReservoir from "../components/home/WaterReservoir";
import { useState, useEffect } from "react";
import PopoverChangeLoad from "../components/home/PopoverChangeLoad";

const Home = () => {
  const [waterLevel, setWaterLevel] = useState(0);
  const getWaterLevel = () => {
    return Math.floor(Math.random() * 100);
  };

  const testArr = [
    {
      id: 1,
      status: 1,
      load: 40,
      powerOut: 30,
    },
    {
      id: 2,
      status: 0,
      load: 60,
      powerOut: 20,
    },
    {
      id: 3,
      status: -1,
      load: 90,
      powerOut: 80,
    },
    {
      id: 4,
      status: 1,
      load: 40,
      powerOut: 30,
    },
    {
      id: 5,
      status: 0,
      load: 60,
      powerOut: 20,
    },
    {
      id: 6,
      status: -0.7,
      load: 90,
      powerOut: 80,
    },
  ];

  // useEffect(() => {
  //   const waterLevel = setInterval(() => {
  //     setWaterLevel(getWaterLevel());
  //   }, 3000);
  //   return () => clearInterval(waterLevel);
  // }, [waterLevel]);
  return (
    <div className="flex h-screen bg-gray-700">
      <div className="grid grid-cols-2 py-6">
        <div className="mb-10 flex -translate-x-40 -translate-y-10 flex-col items-center justify-center gap-y-5">
          <WaterReservoir waterLevel={waterLevel} />
          <WaterReservoirCard waterLevel={waterLevel} />
        </div>
        <div>
          <div className="grid -translate-x-20 grid-cols-3 gap-10">
            {testArr.map(({ id, status, load, powerOut }) => (
              <TurbineCard
                key={id}
                id={id}
                status={status}
                load={load}
                powerOut={powerOut}
              />
            ))}
          </div>
        </div>
        {/* <StopButton /> */}
      </div>
    </div>
  );
};

export default Home;
