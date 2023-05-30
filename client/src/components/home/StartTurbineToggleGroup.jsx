import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const StartTurbineToggleGroup = (
  setTurbineState,
  turbineStatusChange,
  capacityUsage2,
  setCapacityUsage2
) => {
  const [turbine, setTurbine] = useState("startup");

  return (
    <RadioGroup value={turbine} onChange={setTurbine}>
      <div className="flex flex-row justify-between py-3 text-white">
        <RadioGroup.Option value="startup">
          {({ checked }) => (
            <span
              onClick={() => {
                setCapacityUsage2(-1);
                setTurbineState(capacityUsage2);
                turbineStatusChange(capacityUsage2);
                console.log("stop");
              }}
              className={
                checked
                  ? "z-10 my-1 cursor-pointer rounded-lg border-2 bg-let-in px-2 py-2 text-lg"
                  : "z-10 my-1 cursor-pointer rounded-lg border-2 bg-gray-700/50 px-2 py-2 text-lg"
              }
            >
              Slipp inn
            </span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="business">
          {({ checked }) => (
            <span
              onClick={() => {
                setCapacityUsage2(1);
                setTurbineState(capacityUsage2);
                turbineStatusChange(capacityUsage2);
                console.log("start");
              }}
              className={
                checked
                  ? "z-10 my-1 cursor-pointer rounded-lg border-2 bg-pump-out px-2 py-2 text-lg"
                  : "z-10 my-1 cursor-pointer rounded-lg border-2 bg-gray-700/50 px-2 py-2 text-lg"
              }
            >
              Pump ut
            </span>
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
};

export default StartTurbineToggleGroup;