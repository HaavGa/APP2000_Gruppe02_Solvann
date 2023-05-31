import axios from "axios";
import { useState } from "react";
import StopTurbineButton from "./StopTurbineButton";
import StartActionButton from "./StartActionButton";
import PopoverChangeLoad from "./PopoverChangeLoad";
import StartTurbineToggleGroup from "./StartTurbineToggleGroup";

/**
 * Oppretter et Turbinkort med relevant info for den turbinen
 * @param {string} id
 * @param {number} turbinNr
 * @param {number} capacityUsage
 * @param {object} config config for å poste mot Solvann sitt API
 * @returns {any}
 */
const TurbineCard = ({ id, turbinNr, capacityUsage, config }) => {
  const [disableCard, setDisableCard] = useState(false);
  const [number, setNumber] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [turbineState, setTurbineState] = useState(0);
  const [load, setLoad] = useState(0);
  const [powerOut, setPowerOut] = useState(0);
  const [capacityUsage2, setCapacityUsage2] = useState(0);
  // const [capacityUsage2, setCapacityUsage2] = useState(false);

  const MAX_FLOWRATE = 41.4;
  const POWER_PER_CUBIC_METER = 1.3;

  /**
   * @source https://stackoverflow.com/questions/43067719/how-to-allow-only-numbers-in-textbox-in-reactjs
   * @param {e} e elementet som er valgt
   */
  const allowNumbers = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    value >= 100 ? setNumber(100) : setNumber(value);
  };

  /**
   * Metoden poster valgt kapasitet som effekt (funker ikke)
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(capacityUsage);
    setNumber("");
    setPowerOut((load * MAX_FLOWRATE * POWER_PER_CUBIC_METER).toFixed(2));
    const newCapacityUsage = +number;
    const baseUrl = `https://solvann.azurewebsites.net/api/Turbines/${id}?capacityUsage=${newCapacityUsage}`;
    try {
      axios.put(`${baseUrl}`, {}, config);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Metoden sender kapasiteten til API'et for å endre turbinstatus
   * @param {number} capacityUsage hvilken kapasitet som er valgt
   */
  const turbineStatusChange = (capacityUsage) => {
    const baseUrl = `https://solvann.cyclic.app/api/turbine/${turbinNr}`;
    try {
      axios.post(`${baseUrl}`, { capacityUsage: capacityUsage }, config);
    } catch (err) {
      console.log(err);
    }
    console.log(`TurbinNr: ${turbinNr} capacity usage: ${capacityUsage}`);
  };

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
                classNames={
                  "z-10 mt-10 w-1/2 -translate-y-2 rounded-lg border-2 py-2 text-xl"
                }
              />
              <StartActionButton
                setDisableCard={setDisableCard}
                text={"Slipp inn"}
                color={"orange"}
                setTurbineState={setTurbineState}
                capacityUsage={-1}
                turbineStatusChange={turbineStatusChange}
                classNames={
                  "z-10 mt-10 w-1/2 -translate-y-2 rounded-lg border-2 py-2 text-xl"
                }
              />
            </div>
          ) : null}
          <div className="space-y-[1.5rem] p-4">
            <h1 className="text-center text-2xl font-bold text-gray-700">
              Turbin #{turbinNr}
            </h1>
            <div className="h-[2px] w-full -translate-y-3 bg-gray-700"></div>
            <div className="grid grid-cols-2 gap-y-1 text-lg">
              <h2>Kapasitet:</h2>
              <div className="flex items-center justify-between">
                <div className={`text xl ${load < 100 ? "translate-x-3" : ""}`}>
                  {load}%
                </div>
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
              <h2 className="pt-1">Effekt:</h2>
              <p className="pt-1 text-right">
                {(powerOut / 100).toFixed(2)} MWh/s
              </p>
            </div>
            {/* <Toggle
              enabled={enabled}
              setEnabled={setEnabled}
              disableCard={disableCard}
              turbineState={turbineState}
              setTurbineState={setTurbineState}
            /> */}
            {/* <div className="flex justify-between">
              <StartActionButton
                setDisableCard={setDisableCard}
                text={"Slipper inn"}
                color={"orange"}
                setTurbineState={setTurbineState}
                capacityUsage={-1}
                turbineStatusChange={turbineStatusChange}
                disabled={disabled}
                setDisabled={setDisabled}
                classNames={"z-10 my-1 rounded-lg border-2 px-2 py-2 text-lg"}
              />
              <StartActionButton
                setDisableCard={setDisableCard}
                text={"Pumper ut"}
                color={"blue"}
                setTurbineState={setTurbineState}
                capacityUsage={1}
                turbineStatusChange={turbineStatusChange}
                disabled={disabled}
                setDisabled={setDisabled}
                classNames={"z-10 my-1 rounded-lg border-2 px-2 py-2 text-lg"}
              />
            </div> */}
            <StartTurbineToggleGroup
              setTurbineState={setTurbineState}
              turbineStatusChange={turbineStatusChange}
              setCapacityUsage2={setCapacityUsage2}
              capacityUsage2={capacityUsage2}
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
