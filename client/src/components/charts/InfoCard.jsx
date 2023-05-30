const InfoCard = ({ icon, info, infoHeader, color }) => {
  const colorVariants = {
    blue: "bg-blue-100 text-blue-500",
    green: "bg-green-100 text-green-500",
    red: "bg-red-100 text-red-500",
  };
  return (
    <div className="shadow-xs mx-auto max-w-lg overflow-hidden rounded-lg border-4 bg-white">
      <div className="flex items-center p-4">
        <div className={`${colorVariants[color]} mr-4 rounded-full p-3`}>
          <div className="h7 w7">{icon}</div>
        </div>
        <div className="text-left">
          <p className="mb-2 text-sm font-medium text-gray-600">{infoHeader}</p>
          <p className="text-lg font-semibold text-gray-700">{info}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
