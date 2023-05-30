const StartActionButton = ({
  setDisableCard,
  text,
  color,
  setTurbineState,
  capacityUsage,
  turbineStatusChange,
  setDisabled,
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
