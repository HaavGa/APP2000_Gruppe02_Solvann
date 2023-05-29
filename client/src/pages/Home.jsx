import TurbineCard from "../components/home/TurbineCard";
import StopButton from "../components/home/StopButton";
import WaterReservoirCard from "../components/home/WaterReservoirCard";
import WaterReservoir from "../components/home/WaterReservoir";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const Home = ({ auth }) => {
  const [homeValues, setHomeValues] = useState({});
  const [turbines, setTurbines] = useState([]);
  const [classNames, setClassNames] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [powerOut, setPowerOut] = useState(0);

  // const firstName = auth().firstName;
  // const lastName = auth().lastName;
  const token = auth().token;
  // console.log(`My name is ${firstName} ${lastName} and the token is ${token}`);

  const config = {
    headers: {
      GroupId: import.meta.env.VITE_SOLVANN_USER,
      GroupKey: import.meta.env.VITE_SOLVANN_PASSWORD,
    },
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

  useEffect(() => {
    const getHomeValues = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://solvann.cyclic.app/api/reservoir/updateHome"
        );
        setHomeValues(response.data);
        setTurbines(response.data.turbinStatuser);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getHomeValues();
  }, []);

  useEffect(() => {
    // const homeValuesInterval = setInterval(() => {
    const getHomeValues = async () => {
      try {
        const response = await axios.get(
          "https://solvann.cyclic.app/api/reservoir/updateHome"
        );
        setHomeValues(response.data);
        setTurbines(response.data.turbinStatuser);
      } catch (err) {
        console.log(err);
      }
    };
    getHomeValues();
    // }, 5000);
    // return () => clearInterval(homeValuesInterval);
  }, []); // homeValues inni her for automatisk oppdatering

  const {
    miljokostnader: environmentCost = 0,
    pengerTjent: moneyEarned = 0,
    totalEndring: totalChange = 0,
    vannInn: waterIn = 0,
    vannUt: waterOut = 0,
    vannstand: waterLevel = 0,
  } = homeValues;

  return (
    <div className="relative flex h-screen overflow-y-hidden bg-bg-main">
      {isLoading && (
        <div className="absolute z-30 grid h-full w-full scale-[2] place-items-center bg-bg-main">
          <Spinner />
        </div>
      )}
      <div className="mx-auto grid grid-rows-2 gap-x-32 p-10">
        <div className="row-span-2 flex flex-col items-center space-y-5">
          <WaterReservoir
            waterLevel={waterLevel}
            classNames={classNames}
            setClassNames={setClassNames}
          />
          <WaterReservoirCard
            waterLevel={waterLevel}
            waterOut={waterOut}
            waterIn={waterIn}
            totalChange={totalChange}
            moneyEarned={moneyEarned}
            environmentCost={environmentCost}
          />
        </div>
        <div className="col-span-2 col-start-2 grid grid-cols-3 gap-5">
          {turbines.map(({ id, capacityUsage }, turbinNr) => (
            <TurbineCard
              key={id}
              id={id}
              turbinNr={turbinNr + 1}
              capacityUsage={capacityUsage}
              config={config}
              powerOut={powerOut}
              setPowerOut={setPowerOut}
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
