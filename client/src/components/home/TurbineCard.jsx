import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Toggle from "./Toggle";
import StopTurbineButton from "./StopTurbineButton";
import StartActionButton from "./StartActionButton";
import PopoverChangeLoad from "./PopoverChangeLoad";

const TurbineCard = ({ turbinNr, status, powerOut }) => {
  const [pump, setPump] = useState(true);
  const [disableCard, setDisableCard] = useState(false);
  const [number, setNumber] = useState("");
  const [load, setLoad] = useState(0);
  // const [msg, setMsg] = useState("");

  const allowNumbers = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value >= 100) {
      setNumber(100);
    } else {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNumber("");
    if (number !== "") {
      const number1 = +number;
      console.log(number1);
      setLoad(number1);
    } else {
      console.log("ingen tall");
      return;
    }
    // const baseUrl = "https://solvann.cyclic.app/api/users/";
    // try {
    //   console.log(values);
    //   axios.post(`${baseUrl}`, values);
    // } catch (err) {
    //   console.log(err);
    // }
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
                startStopPump={() => setPump(true)}
              />
              <StartActionButton
                setDisableCard={setDisableCard}
                text={"Slipp inn"}
                color={"orange"}
                startStopPump={() => setPump(false)}
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
                <div className="translate-x-3 text-xl">{load}</div>
                <div className="z-10 translate-y-1">
                  <PopoverChangeLoad
                    number={number}
                    allowNumbers={allowNumbers}
                    handleSubmit={handleSubmit}
                    disableCard={disableCard}
                    load={load}
                    setLoad={setLoad}
                  />
                </div>
              </div>
              <h2 className="pt-1">Power out:</h2>
              <p className="pt-1 text-right">{powerOut} MWh/s</p>
            </div>
            <Toggle
              enabled={pump}
              setEnabled={setPump}
              disableCard={disableCard}
            />

            <div className="mt-3 flex justify-center">
              <StopTurbineButton setDisableCard={setDisableCard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurbineCard;
