const StartActionButton = ({
  setDisableCard,
  text,
  color,
  setTurbineState,
  capacityUsage,
  turbineStatusChange,
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
      className={`${colorVariants[color]} z-10 mt-10 w-1/2 -translate-y-2 rounded-lg border-2 py-2 text-xl`}
    >
      {text}
    </button>
  );
};

export default StartActionButton;
