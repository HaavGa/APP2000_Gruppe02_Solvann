import InfoCard from "./InfoCard";
import { CiShoppingCart, CiShoppingTag } from "react-icons/ci";
import { IoWater } from "react-icons/io5";

const Info = ({ buy, sell, waterLevel }) => {
  return (
    <div className="rounded-md bg-white text-gray-700">
      <h1 className=" text-6xl font-semibold">Info</h1>
      <div className="my-2 h-1 w-full bg-gray-700"></div>
      {/* <p>Burde du kjøpe? {buy ? "Ja" : "Nei"}</p>
      <p>Burde du selge? {sell ? "Ja" : "Nei"}</p>
      <p>Vannivået er {waterLevel.toFixed(2)} meter</p> */}
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
