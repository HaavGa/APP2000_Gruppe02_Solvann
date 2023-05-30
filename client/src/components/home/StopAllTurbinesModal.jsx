import axios from "axios";
import { Dialog } from "@headlessui/react";

const StopAllTurbinesModal = ({ isOpen, setIsOpen }) => {
  const stopAllTurbines = () => {
    const baseUrl = "https://solvann.cyclic.app/api/turbine/";
    const data = {
      capacityUsage: 1,
    };
    try {
      axios.post(`${baseUrl}`, data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog
      className={"fixed inset-0 z-[100] bg-black/50"}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className={"flex h-full items-center justify-center"}>
        <Dialog.Panel
          className={" max-w-lg rounded-lg bg-white p-4 text-center shadow-lg"}
        >
          <Dialog.Title>Stopp alle turbiner?</Dialog.Title>

          <p>
            Er du sikker på at du vi stoppe alle turbiner? Trykk OK for
            bekrefte, eller Avbryt for å avbryte.
          </p>

          <div className="flex justify-center space-x-6">
            <button
              className={"btn bg-red-400 "}
              onClick={() => {
                setIsOpen(false);
                stopAllTurbines();
              }}
            >
              OK
            </button>
            <button
              className={"btn bg-gray-400 "}
              onClick={() => setIsOpen(false)}
            >
              Avbryt
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default StopAllTurbinesModal;
