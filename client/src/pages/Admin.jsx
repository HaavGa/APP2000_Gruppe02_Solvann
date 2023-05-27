import { useState, useEffect } from "react";
import SignupForm from "../components/admin/SignupForm";
import UpdateForm from "../components/admin/UpdateForm";
import UsersList from "../components/admin/UsersList";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [savedValues, setSavedValues] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://solvann.cyclic.app/api/users/");
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUser = async (_id) => {
    console.log(_id);
    setUpdateForm(true);
    setLoadingEdit(true);
    try {
      const response = await axios.patch(
        `https://solvann.cyclic.app/api/users/${_id}`
      );
      console.log(response.data);
      setSavedValues(response.data);
      setLoadingEdit(false);
    } catch (err) {
      console.log(err.data.message);
    }
    await fetchUsers();
  };

  const deleteUser = async (_id) => {
    console.log(_id);
    try {
      const response = await axios.delete(
        `https://solvann.cyclic.app/api/users/${_id}`
      );
      console.log(response);
    } catch (err) {
      console.log(err.response.data.message);
    }
    await fetchUsers();
  };

  return (
    <div className="h-screen bg-gray-700 py-3 text-center">
      <div className="mt-10 flex justify-center gap-2 ">
        <UsersList
          users={users}
          loading={loading}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
        {!updateForm && <SignupForm />}
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
