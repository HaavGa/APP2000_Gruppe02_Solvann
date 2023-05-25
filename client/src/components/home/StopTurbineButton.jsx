const StopTurbineButton = ({ setDisableCard }) => {
  return (
    <button
      onClick={() => {
        setDisableCard(true);
      }}
      className="w-full rounded-lg border-2 border-gray-500 bg-gray-300 py-1 text-xl font-semibold text-red-700 hover:bg-gray-400"
    >
      Stop
    </button>
  );
};

export default StopTurbineButton;
