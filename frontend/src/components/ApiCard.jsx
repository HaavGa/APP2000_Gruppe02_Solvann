const ApiCard = ({ text, data }) => {
  return (
    <div>
      <div className="inline-block w-[18.5rem] overflow-hidden rounded-lg bg-white shadow">
        <div className="bg-white p-5">
          <h3 className="text-md text-center font-medium leading-6 text-gray-700">
            {text[0]}
          </h3>
          <p className="text-center text-3xl font-bold text-black">
            {data}&nbsp;
            <span className="text-2xl text-gray-700">{text[1]}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiCard;
