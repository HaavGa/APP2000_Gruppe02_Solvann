import axios from "axios";
import { useState } from "react";
import Toggle from "./Toggle";
import StopTurbineButton from "./StopTurbineButton";
import StartActionButton from "./StartActionButton";
import PopoverChangeLoad from "./PopoverChangeLoad";

const TurbineCard = ({
  id,
  turbinNr,
  capacityUsage,
  config,
  powerOut,
  setPowerOut,
}) => {
  const [disableCard, setDisableCard] = useState(false);
  const [number, setNumber] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [turbineState, setTurbineState] = useState(0);
  const [load, setLoad] = useState(0);

  const MAX_FLOWRATE = 41.4;
  const POWER_PER_CUBIC_METER = 1.3;

  setPowerOut((1 * MAX_FLOWRATE * POWER_PER_CUBIC_METER).toFixed(2));
  // hardkodet enn så lenge

  const allowNumbers = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    value >= 100 ? setNumber(100) : setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(capacityUsage);
    setNumber("");
    const newCapacityUsage = +number;
    const baseUrl = `https://solvann.azurewebsites.net/api/Turbines/${id}?capacityUsage=${newCapacityUsage}`;
    try {
      axios.put(`${baseUrl}`, {}, config);
    } catch (err) {
      console.log(err);
    }
  };

  const turbineStatusChange = (capacityUsage) => {
    const baseUrl = `https://solvann.cyclic.app/api/turbine/${turbinNr}`;
    try {
      axios.post(`${baseUrl}`, { capacityUsage: capacityUsage }, config);
    } catch (err) {
      console.log(err);
    }
    console.log(`TurbinNr: ${turbinNr} capacity usage: ${capacityUsage}`);
  };

  // useEffect(() => {
  //   const msgInterval = setInterval(async () => {
  //     const response = await axios.get(
  //       "https://solvann.cyclic.app/api/water/test"
  //     );
  //     setMsg(response.data.msg);
  //   }, 10000);
  //   return () => clearInterval(msgInterval);
  // }, [msg]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative h-80 w-64 rounded-xl bg-white shadow-xl">
          {disableCard ? (
            <div className="absolute z-20 flex h-full w-full flex-col items-center justify-center bg-gray-700/90">
              <StartActionButton
                setDisableCard={setDisableCard}
                text={"Pump ut"}
                color={"blue"}
                setTurbineState={setTurbineState}
                capacityUsage={1}
                turbineStatusChange={turbineStatusChange}
              />
              <StartActionButton
                setDisableCard={setDisableCard}
                text={"Slipp inn"}
                color={"orange"}
                setTurbineState={setTurbineState}
                capacityUsage={-1}
                turbineStatusChange={turbineStatusChange}
              />
            </div>
          ) : null}
          <div className="space-y-[1.5rem] p-4">
            <h1 className="text-center text-2xl font-bold text-gray-700">
              Turbin #{turbinNr}
            </h1>
            <div className="h-[2px] w-full -translate-y-3 bg-gray-700"></div>
            <div className="grid grid-cols-2 gap-y-1 text-lg">
              <h2>Load:</h2>
              <div className="flex items-center justify-between">
                <div className={"translate-x-1 text-xl"}>{load}</div>
                <div className="z-10 translate-y-1">
                  <PopoverChangeLoad
                    number={number}
                    allowNumbers={allowNumbers}
                    handleSubmit={handleSubmit}
                    disableCard={disableCard}
                    setLoad={setLoad}
                  />
                </div>
              </div>
              <h2 className="pt-1">Power out:</h2>
              <p className="pt-1 text-right">{powerOut} MWh/s</p>
            </div>
            <Toggle
              enabled={enabled}
              setEnabled={setEnabled}
              disableCard={disableCard}
              turbineState={turbineState}
              setTurbineState={setTurbineState}
            />

            <div className="mt-3 flex justify-center">
              <StopTurbineButton
                setDisableCard={setDisableCard}
                setTurbineState={setTurbineState}
                capacityUsage={0}
                turbineStatusChange={turbineStatusChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurbineCard;
