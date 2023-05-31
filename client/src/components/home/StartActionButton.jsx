/**
 * Knapp for å pumpe ut eller slippe inn på en turbin
 * @param {method} setDisableCard
 * @param {string} text
 * @param {string} color
 * @param {method} setTurbineState
 * @param {number} capacityUsage
 * @param {method} turbineStatusChange
 * @param {string} classNames
 * @returns Knapp med valgt farge og tekst, samt klasseNavn
 */
const StartActionButton = ({
  setDisableCard,
  text,
  color,
  setTurbineState,
  capacityUsage,
  turbineStatusChange,
  classNames,
}) => {
  const colorVariants = {
    blue: "bg-blue-200 border-blue-500 hover:bg-blue-300",
    orange: "bg-orange-200 border-orange-500 hover:bg-orange-300",
  };
  return (
    <button
      onClick={() => {
        setDisableCard(false);
        setTurbineState(capacityUsage);
        turbineStatusChange(capacityUsage);
      }}
      className={`${colorVariants[color]} ${classNames}`}
    >
      {text}
    </button>
  );
};

export default StartActionButton;
