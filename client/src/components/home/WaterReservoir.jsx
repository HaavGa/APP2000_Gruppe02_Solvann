/**
 * Oppretter vannreservoar med farge som oppdaterer seg basert
 * på vannnivå
 * @source https://stackoverflow.com/questions/24721233/drawing-water-container-with-css
 * @param {number} waterLevel waterLevel
 * @param {string} classNames classNames
 * @param {method} setClassNames setClassNames
 * @param {method} setShadow setShadow
 * @param {method} shadow shadow
 * @returns vannreservoaret
 */
const WaterReservoir = ({
  waterLevel,
  classNames,
  setClassNames,
  setShadow,
  shadow,
}) => {
  /**
   * Metoden endrer "vannet" fra blått til rødt når det går
   * utenfor akseptabelt nivå
   */
  const finalWaterlevel = waterLevel * 2;
  finalWaterlevel > 50 && finalWaterlevel < 80
    ? setClassNames("bg-blue-500")
    : setClassNames("bg-red-500 shadow-2xl shadow-red-500 animate-pulse");

  return (
    <div
      className={`relative h-80 w-64 rounded-lg border-4 border-black bg-white shadow-lg`}
    >
      <div
        className={`absolute bottom-0 w-full ${classNames}`}
        style={{
          height: `${finalWaterlevel}%`,
        }}
      ></div>
      <div className="absolute bottom-[80%] z-10 h-[4px] w-full bg-black"></div>
      <div className="absolute bottom-[50%] z-10 h-[4px] w-full bg-black"></div>
    </div>
  );
};

export default WaterReservoir;
