import { useState } from "react";
import Axios from "axios";
import ApiCard from "./ApiCard";

const PowerPrice = () => {
  const [price, setPrice] = useState(0);
  const [solar, setSolar] = useState(0);

  const handleClick = () => {
    getApiData();
  };

  const getApiData = async () => {
    const getPrice = await Axios.get(
      "https://solvann.azurewebsites.net/api/PowerPrice"
    );
    const getSolar = await Axios.get(
      "https://solvann.azurewebsites.net/api/Solar"
    );
    setPrice(getPrice.data);
    setSolar(Math.round(getSolar.data * 100) / 100);
  };

  return (
    <div className="flex flex-col">
      <button className="btn bg-black hover:bg-gray-900" onClick={handleClick}>
        Oppdater API-data
      </button>

      <div className="mt-5 flex justify-center gap-5">
        <ApiCard text={["Solcelleproduksjon:", "kWh/s"]} data={solar} />
        <ApiCard text={["Strømpris:", "NOK/MWh"]} data={price} />
      </div>
    </div>
  );
};

export default PowerPrice;
