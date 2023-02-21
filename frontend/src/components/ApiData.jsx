import { useState } from "react";
import Axios from "axios";

function PowerPrice() {
    
  const [isShown, setIsShown] = useState(false);
  const [price, setPrice] = useState(0);
  const [solar, setSolar] = useState(0);

  function handleClick() {
    setIsShown((current) => !current);
    getApiData();      
  }

  async function getApiData() { 
    let getPrice = await Axios.get(
      "https://solvann.azurewebsites.net/api/PowerPrice"
    );
    let getSolar = await Axios.get(
      "https://solvann.azurewebsites.net/api/Solar"
    );
    setPrice(getPrice.data);
    setSolar(Math.round(getSolar.data * 100) / 100);    
    console.log(solar)
  }

  return (
    <>

        <button
          className="btn translate-y-10 bg-red-300 hover:bg-red-400"
          onClick={handleClick}
        >
          Hent API-data
        </button>


        {isShown && (
          <div className="mt-5 text-white text-center">
            <p className="pb-3 pt-10">Strømpris: {price} NOK/MWh</p>
            <p>Solcelleproduksjon: {solar} kWh/s</p>
          </div>
        )}

    </>
  );
}

export default PowerPrice;

