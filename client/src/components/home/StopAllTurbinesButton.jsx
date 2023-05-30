const StopAllTurbinesButton = ({ openModal }) => {
  return (
    <button
      onClick={openModal}
      className="btn mx-auto bg-red-500 hover:bg-red-600"
    >
      Stopp
    </button>
  );
};

export default StopAllTurbinesButton;
