import { useState } from "react";
import Axios from "axios";

const PowerPrice = () => {
  const [isShown, setIsShown] = useState(false);
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
      <button
        className="btn self-center bg-red-300 hover:bg-red-400"
        onClick={handleClick}
      >
        Oppdater API-data
      </button>
      <div className="text-center text-white">
        <p className="pb-3">Strømpris: {price} NOK/MWh</p>
        <p>Solcelleproduksjon: {solar} kWh/s</p>
      </div>
    </div>
  );
};

export default PowerPrice;
