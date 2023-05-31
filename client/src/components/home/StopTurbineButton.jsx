/**
 * Stop-knapp for en enkelt turbin
 * @param {method} setDisableCard
 * @param {method} setTurbineState
 * @param {method} capacityUsage
 * @param {method} turbineStatusChange
 * @returns knapp som stopper en turbin
 */
const StopTurbineButton = ({
  setDisableCard,
  setTurbineState,
  capacityUsage,
  turbineStatusChange,
}) => {
  return (
    <button
      onClick={() => {
        setDisableCard(true);
        setTurbineState(capacityUsage);
        turbineStatusChange(capacityUsage);
      }}
      className="w-full rounded-lg border-2 border-gray-500 bg-gray-300 py-1 text-xl    font-semibold text-red-700 hover:bg-gray-400"
    >
      Stopp
    </button>
  );
};

export default StopTurbineButton;
