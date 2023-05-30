import { useState, useEffect } from "react";
import axios from "axios";
import SignupForm from "../components/admin/SignupForm";
import UpdateForm from "../components/admin/UpdateForm";
import UsersList from "../components/admin/UsersList";
import DeleteUserModal from "../components/admin/DeleteUserModal";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://solvann.cyclic.app/api/users/");
      setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      // console.log(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUser = async (_id) => {
    setUpdateForm(true);
    setLoadingEdit(true);
    try {
      const response = await axios.patch(
        `https://solvann.cyclic.app/api/users/${_id}`
      );
      setSavedValues(response.data);
      setLoadingEdit(false);
    } catch (err) {
      console.log(err.data.message);
    }
    fetchUsers();
  };

  const deleteUser = async (_id) => {
    try {
      const response = await axios.delete(
        `https://solvann.cyclic.app/api/users/${_id}`
      );
    } catch (err) {
      console.log(err.response.data.message);
    }
    fetchUsers();
  };

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  return (
    <div className="h-screen bg-gray-700 py-3 text-center">
      <div className="mt-10 flex justify-center gap-2 ">
        {/* <div>
          <DeleteUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div> */}
        {/* <div>
          <button onClick={openModal} className="btn bg-red-300">
            slett bruker
          </button>
        </div> */}
        <UsersList
          users={users}
          isLoading={isLoading}
          updateUser={updateUser}
          deleteUser={deleteUser}
          // openModal={openModal}
        />
        {!updateForm && <SignupForm fetchUsers={fetchUsers} />}
        {savedValues && updateForm && (
          <UpdateForm
            loadingEdit={loadingEdit}
            setUpdateForm={setUpdateForm}
            savedValues={savedValues}
            fetchUsers={fetchUsers}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
