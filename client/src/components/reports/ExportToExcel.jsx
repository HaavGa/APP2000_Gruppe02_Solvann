import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportToExcel = ({ excelData, fileName, btnText }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (excelData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="btn w-[18rem] bg-white text-black hover:bg-gray-200"
      onClick={(e) => exportToCSV(excelData, fileName)}
    >
      {btnText}
    </button>
  );
};
export default ExportToExcel;
