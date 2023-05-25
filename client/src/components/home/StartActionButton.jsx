const StartActionButton = ({ setDisableCard, text, color, func }) => {
  const colorVariants = {
    yellow: "bg-yellow-200 border-yellow-500 hover:bg-yellow-300",
    purple: "bg-purple-200 border-purple-500 hover:bg-purple-300",
  };
  return (
    <button
      onClick={() => {
        setDisableCard(false);
        {
          func();
        }
        console.log(color);
      }}
      className={`${colorVariants[color]} z-10 mt-10 w-1/2 -translate-y-2 rounded-lg border-2 py-2 text-xl`}
    >
      {text}
    </button>
  );
};

export default StartActionButton;
