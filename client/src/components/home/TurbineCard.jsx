import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Toggle from "./Toggle";
import StopTurbineButton from "./StopTurbineButton";
import StartActionButton from "./StartActionButton";

const TurbineCard = ({ id, status, load, powerOut }) => {
  const [pump, setPump] = useState(true);
  const [disableCard, setDisableCard] = useState(false);
  const [number, setNumber] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNumber("");
    const number1 = +number;
    console.log(typeof number1);
    console.log(number1);
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
    <div className="w-72">
      {/* <div className="my-3 flex justify-center">
        <Turbine status={status} />
      </div> */}
      {console.log(msg)}
      <div className="flex">
        <div className="relative rounded-xl bg-white shadow-xl">
          {disableCard ? (
            <div className="absolute flex h-full w-full flex-col items-center justify-center bg-gray-700/90">
              <StartActionButton
                setDisableCard={setDisableCard}
                text={"Pump ut"}
                color={"yellow"}
                func={() => setPump(true)}
              />
              <StartActionButton
                setDisableCard={setDisableCard}
                text={"Slipp inn"}
                color={`purple`}
                func={() => setPump(false)}
              />
            </div>
          ) : null}
          <div className="p-4">
            <h1 className="text-center text-2xl font-bold text-gray-700">
              Turbine #{id}
            </h1>
            <div className="mb-4 mt-2 h-[2px] w-full bg-gray-700"></div>
            <div className="grid grid-cols-2 grid-rows-3 gap-y-1 text-lg">
              <h2>Status:</h2>
              <p className="text-right">
                {status > 0 ? "Positiv" : status < 0 ? "Negative" : "Stop"}
              </p>
              <h2>Load:</h2>
              <form onSubmit={handleSubmit} className="text-right">
                <input
                  id="load"
                  name="load"
                  className="w-8 rounded-md border-2 border-black text-center"
                  value={number}
                  maxLength={2}
                  onChange={handleChange}
                />{" "}
                %
                <button
                  className="ml-1 rounded-md border-2 border-black px-1 hover:bg-gray-200"
                  type="submit"
                >
                  Lagre
                </button>
              </form>
              <h2>Power out:</h2>
              <p className="text-right">{powerOut} MWh/s</p>
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
