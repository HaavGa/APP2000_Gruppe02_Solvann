import TurbineImg from "../../images/turbine2.png";
const Turbine = () => {
  return (
    <>
      <div className="clockwise-spin w-20">
        <img src={TurbineImg} alt="Turbine" />
      </div>
      {/* <div className="anticlockwise-spin w-20">
        <img src={TurbineImg} alt="Turbine" />
      </div> */}
    </>
  );
};

export default Turbine;
