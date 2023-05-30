import axios from "axios";
import { Dialog } from "@headlessui/react";

const DeleteUserModal = ({ isOpen, setIsOpen }) => {
  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `https://solvann.cyclic.app/api/users/${_id}`
      );
      console.log(response);
    } catch (err) {
      console.log(err.response.data.message);
    }
    fetchUsers();
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
          <Dialog.Title>Slette brukeren?</Dialog.Title>

          <p>
            Er du sikker på at du vil slette brukeren? Trykk OK for bekrefte,
            eller Avbryt for å avbryte.
          </p>

          <div className="flex justify-center space-x-6">
            <button
              className={"btn bg-red-400 "}
              onClick={() => {
                setIsOpen(false);
                deleteUser();
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

export default DeleteUserModal;
