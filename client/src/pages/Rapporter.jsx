import ExportToExcel from "../components/reports/ExportToExcel";

const Rapporter = () => {
  const currentDate = new Date().toJSON().slice(0, 10);
  
  // dummy data for bruker-rapporten
  const userData = [
    {
      _id: {
        $oid: "646df520f02fef008f8ff5ad",
      },
      firstName: "John",
      lastName: "Carew",
      email: "jcarew@solvann.no",
      password: "$2b$10$pIouKLAzhBExUjNHWG.5V.wdQVyOJ/.N5kKQU7Boa0LunwZpRKyfm",
      isAdmin: false,
      createdAt: {
        $date: {
          $numberLong: "1684927776750",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1685019261640",
        },
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "646e0202592d462b846589a1",
      },
      firstName: "Kari",
      lastName: "Banan",
      email: "kbanan@solvann.no",
      password: "$2b$10$yw4xCXiqP0pO2KZvfS4bue8D7oZE9JZoT0POFDv/MOp3aVOJpGmfu",
      isAdmin: false,
      createdAt: {
        $date: {
          $numberLong: "1684931074176",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1684931074176",
        },
      },
      __v: 0,
    }];

  // dummy-data for vannstand-rapporten
  const waterlevelData = [
    {
      "waterLevel": 50,
      "date": {
        "$date": {
          "$numberLong": "1685052002629"
        }
      }
    },
    {
      "waterLevel": 27.167331326978715,
      "date": {
        "$date": {
          "$numberLong": "1685059202660"
        }
      }
  }];

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
