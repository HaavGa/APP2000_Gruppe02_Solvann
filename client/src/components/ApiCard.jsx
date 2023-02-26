const ApiCard = ({ text, data }) => {
  return (
    <div>
      <div className="w-[18.5rem] overflow-hidden rounded-lg bg-white p-5 shadow">
        <h3 className="text-center text-lg font-medium leading-6 text-gray-700">
          {text[0]}
        </h3>
        <p className="text-center text-3xl font-bold text-black">
          {data} <span className="text-2xl text-gray-700">{text[1]}</span>
        </p>
      </div>
    </div>
  );
};

export default ApiCard;
