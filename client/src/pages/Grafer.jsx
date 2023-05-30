import { useState, useEffect } from "react";
import Chart from "../components/charts/Chart";
import axios from "axios";
import Spinner from "../components/utils/Spinner";
import Info from "../components/charts/Info";

const Grafer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [graphValues, setGraphValues] = useState({});
  const [powerPrice, setPowerPrice] = useState([]);
  const [solar, setSolar] = useState([]);
  const [waterLevelArray, setWaterLevelArray] = useState([]);

  const BASE_URL_GRAPH =
    "https://solvann.cyclic.app/api/reservoir/updateGraphs";

  useEffect(() => {
    const getGraphValues = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(BASE_URL_GRAPH);
        setGraphValues(response.data);
        setPowerPrice(response.data.powerPrice);
        setSolar(response.data.solar);
        setWaterLevelArray(response.data.vannstandArray);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getGraphValues();
  }, []);
  useEffect(() => {
    const getGraphValues = async () => {
      try {
        const response = await axios.get(BASE_URL_GRAPH);
        setGraphValues(response.data);
        setPowerPrice(response.data.powerPrice);
        setSolar(response.data.solar);
        setWaterLevelArray(response.data.vannstandArray);
      } catch (err) {
        console.log(err.message);
      }
    };
    getGraphValues();
  }, []); // graphValues inni her for automatisk oppdatering

  const { buy = false, sell = false, vannstand: waterLevel = 0 } = graphValues;
  // console.log(powerPrice);
  // console.log(solar);
  // console.log(waterLevelArray);
  // console.log(buy, sell, waterLevel);
  return (
    <div className="relative m-7 h-screen overflow-hidden bg-bg-main text-center text-white">
      {isLoading && (
        <div className="absolute z-30 grid h-full w-full scale-[2] place-items-center bg-bg-main">
          <Spinner />
        </div>
      )}
      <div className="m-2 grid h-screen grid-cols-2 grid-rows-2 gap-5">
        {graphValues && (
          <>
            <Chart
              data={powerPrice}
              title={"Strømpris"}
              yAxis={"Kroner"}
              color={"green"}
            />
            <Info buy={buy} sell={sell} waterLevel={waterLevel} />
            <Chart
              data={solar}
              title={"Solceller"}
              yAxis={"KWh/s"}
              color={"orange"}
            />
            <Chart
              data={waterLevelArray}
              title={"Vannivå"}
              yAxis={"Meter"}
              color={"blue"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Grafer;
