import ExportToExcel from "../components/reports/ExportToExcel";

const Rapporter = () => {
  const currentDate = new Date().toJSON().slice(0, 10);
  
  // dummy data for bruker-rapporten
  const userData = [
    {
      _id: "6476201146c30b73d65b1206",
      firstName: "Endre",
      lastName: "Adminsen",
      email: "admin1@solvann.no",
      isAdmin: true,
      createdAt: "2023-05-30 16:10:57",
    },
    {
      _id: "6476206546c30b73d65b120b",
      firstName: "Tone",
      lastName: "Adminsen",
      email: "admin2@solvann.no",
      isAdmin: true,
      createdAt: "2023-05-30 16:12:21",
    },
    {
      _id: "6476208a46c30b73d65b1210",
      firstName: "Trevor",
      lastName: "Adminsen",
      email: "admin3@solvann.no",
      isAdmin: true,
      createdAt: "2023-05-30 16:12:58",
    },
    {
      _id: "647620bb46c30b73d65b1215",
      firstName: "Enok",
      lastName: "Driftesen",
      email: "drift1@solvann.no",
      isAdmin: false,
      createdAt: "2023-05-30 16:13:47",
    },
    {
      _id: "647620e846c30b73d65b121b",
      firstName: "Tomine",
      lastName: "Driftesen",
      email: "drift2@solvann.no",
      isAdmin: false,
      createdAt: "2023-05-30 16:14:32",
    },
    {
      _id: "6476210c46c30b73d65b1222",
      firstName: "Trello",
      lastName: "Driftesen",
      email: "drift3@solvann.no",
      isAdmin: false,
      createdAt: "2023-05-30 16:15:08",
    },
  ];

  // dummy-data for vannstand-rapporten
  const waterlevelData = [
    {
      waterlevel: 40.051923674910746,
      time: "2023-05-30 14:01:23",
    },
    {
      waterlevel: 28.194045652296037,
      time: "2023-05-30 16:01:48",
    },
    {
      waterlevel: 14.175802582986169,
      time: "2023-05-30 18:00:08",
    },
    {
      waterlevel: 35.75984724020747,
      time: "2023-05-30 20:04:37",
    },
    {
      waterlevel: 30.027601541462648,
      time: "2023-05-30 22:02:13",
    },
  ];

  return (
    <div className="h-screen bg-gray-700 py-5 text-center text-white">
      <h1 className="text-4xl">Rapporter</h1>
      <div>
        <ExportToExcel
          excelData={userData}
          fileName={"Brukere - " + currentDate}
          btnText={"Last ned brukere"}
        />
      </div>
      <div>
        <ExportToExcel
          excelData={waterlevelData}
          fileName={"Vannstand - " + currentDate}
          btnText={"Last ned vannstand"}
        />
      </div>
    </div>
  );
};

export default Rapporter;
