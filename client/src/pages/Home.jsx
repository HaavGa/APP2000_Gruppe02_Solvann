import TurbineCard from "../components/home/TurbineCard";
import StopButton from "../components/home/StopButton";
import WaterReservoirCard from "../components/home/WaterReservoirCard";
import Turbine from "../components/home/Turbine";
import WaterReservoir from "../components/home/WaterReservoir";
import { useState, useEffect } from "react";
import PopoverChangeLoad from "../components/home/PopoverChangeLoad";
import WaterChart from "../components/charts/WaterChart";

const Home = () => {
  const [waterLevel, setWaterLevel] = useState(0);
  const getWaterLevel = () => {
    return Math.floor(Math.random() * 50);
  };

  const testArr = [
    {
      turbinNr: 1,
      status: 1,
      powerOut: 30,
    },
    {
      turbinNr: 2,
      status: 0,
      powerOut: 20,
    },
    {
      turbinNr: 3,
      status: -1,
      powerOut: 80,
    },
    {
      turbinNr: 4,
      status: 1,
      powerOut: 30,
    },
    {
      turbinNr: 5,
      status: 0,
      powerOut: 20,
    },
    {
      turbinNr: 6,
      status: -0.7,
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
    <div className="relative flex h-screen overflow-y-hidden bg-bg-main">
      <div className="mx-auto grid grid-rows-2 gap-x-32 p-10">
        <div className="row-span-2 flex flex-col items-center space-y-5">
          <WaterReservoir waterLevel={waterLevel} />
          <WaterReservoirCard waterLevel={waterLevel} />
        </div>
        <div className="col-span-2 col-start-2 grid grid-cols-3 gap-5">
          {testArr.map(({ turbinNr, status, load, powerOut }) => (
            <TurbineCard
              key={turbinNr}
              turbinNr={turbinNr}
              status={status}
              load={load}
              powerOut={powerOut}
            />
          ))}
        </div>
      </div>
      {/* <div className="absolute z-10">
        <StopButton />
      </div> */}
    </div>
  );
};

export default Home;
