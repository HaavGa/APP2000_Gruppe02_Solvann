const StopTurbineButton = ({ setDisableCard }) => {
  return (
    <button
      onClick={() => {
        setDisableCard(true);
      }}
      className="w-full rounded-lg border-2 border-red-500 bg-red-200 py-1 text-xl hover:bg-red-300"
    >
      Stop
    </button>
  );
};

export default StopTurbineButton;
