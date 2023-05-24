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

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(
        "https://solvann.cyclic.app/api/users/all"
      );
      setUsers(response.data);
      setLoading(false);
    })();
  }, []);

  const updateUser = async (_id) => {
    console.log(_id);
    setUpdateForm(true);
    setLoadingEdit(true);
    try {
      const response = await axios.patch(
        "https://solvann.cyclic.app/api/users/profile",
        { id: _id }
      );
      setSavedValues(response.data);
      setLoadingEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  // const deleteUser = async (_id) => {
  //   console.log(_id);
  //   try {
  //     await axios.delete("https://solvann.cyclic.app/api/users/delete", {
  //       id: _id,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const deleteUser = async (_id) => {
    console.log(`${_id} is deleted`);
  };

  return (
    <div className="bg-gray-700 py-3 text-center">
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
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
