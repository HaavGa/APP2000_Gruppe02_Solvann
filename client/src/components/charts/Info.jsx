import InfoCard from "./InfoCard";
import { CiShoppingCart, CiShoppingTag } from "react-icons/ci";
import { IoWater } from "react-icons/io5";

/**
 * @author Håvard Garsrud
 * Oppretter en boks med relevant info
 * @param {boolean} buy om man burde kjøpe eller ikke
 * @param {boolean} sell om man burde selge eller ikke
 * @param {number} waterLevel nåværende vannstand
 * @returns
 */
const Info = ({ buy, sell, waterLevel }) => {
  return (
    <div className="rounded-md bg-white text-gray-700">
      <h1 className=" text-6xl font-semibold">Info</h1>
      <div className="my-2 h-1 w-full bg-gray-700"></div>
      <div className="translate-y-5">
        <InfoCard
          icon={<CiShoppingCart />}
          info={buy ? "Ja" : "Nei"}
          infoHeader={"Burde du kjøpe?"}
          color={"green"}
        />
        <InfoCard
          icon={<CiShoppingTag />}
          info={sell ? "Ja" : "Nei"}
          infoHeader={"Burde du selge?"}
          color={"red"}
        />
        <InfoCard
          icon={<IoWater />}
          info={`${waterLevel.toFixed(2)} meter`}
          infoHeader={"Vannivået er"}
          color={"blue"}
        />
      </div>
    </div>
  );
};

export default Info;
