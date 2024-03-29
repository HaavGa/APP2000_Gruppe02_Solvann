import TurbineCard from "../components/home/TurbineCard";
import StopAllTurbinesButton from "../components/home/StopAllTurbinesButton";
import WaterReservoirCard from "../components/home/WaterReservoirCard";
import WaterReservoir from "../components/home/WaterReservoir";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/utils/Spinner";
import StopAllTurbinesModal from "../components/home/StopAllTurbinesModal";

/**
 * @author Håvard Garsrud
 * @param {AuthStateUserObject} auth auth-objekt som viser elementer basert på hva som er lagret i objektet
 * @returns Hjem-siden
 */
const Home = ({ auth }) => {
  const [homeValues, setHomeValues] = useState({});
  const [turbines, setTurbines] = useState([]);
  const [classNames, setClassNames] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Config som setter headeren til GroupId og GroupKey, som er
   * nødvendig for å gjøre API-kall mot Solvann sitt API
   */
  const config = {
    headers: {
      GroupId: import.meta.env.VITE_SOLVANN_USER,
      GroupKey: import.meta.env.VITE_SOLVANN_PASSWORD,
    },
  };

  const BASE_URL_HOME = "https://solvann.cyclic.app/api/reservoir/updateHome";

  /**
   * Metoden henter hjem-verdier fra vårt API, og legger de inn i state når siden lastes inn.
   */
  useEffect(() => {
    const getHomeValues = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(BASE_URL_HOME);
        setHomeValues(response.data);
        setTurbines(response.data.turbinStatuser);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getHomeValues();
  }, []);

  /**
   * Metoden oppdaterer siden når staten "homeValues" endrer seg
   */
  useEffect(() => {
    const getHomeValues = async () => {
      try {
        const response = await axios.get(BASE_URL_HOME);
        setHomeValues(response.data);
        setTurbines(response.data.turbinStatuser);
      } catch (err) {
        console.log(err);
      }
    };
    getHomeValues();
  }, [homeValues]);

  const {
    miljokostnader: environmentCost = 0,
    pengerTjent: moneyEarned = 0,
    totalEndring: totalChange = 0,
    vannInn: waterIn = 0,
    vannUt: waterOut = 0,
    vannstand: waterLevel = 0,
  } = homeValues;

  /**
   * Metoden setter staten setIsOpen til true
   */
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative flex h-screen overflow-y-hidden bg-bg-main">
      {isLoading && (
        <div className="absolute z-30 grid h-full w-full scale-[2] place-items-center bg-bg-main">
          <Spinner />
        </div>
      )}
      <div>
        <StopAllTurbinesModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      {auth().isAdmin && (
        <div className="absolute z-10 flex flex-col items-center p-4 py-8 text-xl text-white">
          <p>Stopp alle turbiner</p>
          <StopAllTurbinesButton openModal={openModal} />
        </div>
      )}
      <div className="mx-auto grid grid-rows-2 gap-x-20 p-12">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
