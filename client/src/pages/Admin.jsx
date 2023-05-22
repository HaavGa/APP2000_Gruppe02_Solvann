import { useState, useEffect } from "react";
import SignupForm from "../components/admin/SignupForm";
import UpdateForm from "../components/admin/UpdateForm";
import UsersList from "../components/admin/UsersList";
import Axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await Axios.get(
        "https://solvann.cyclic.app/api/users/"
        //! Kommenter ut ved development:
        // "http://localhost:5000/api/users"
      );

      setUsers(response.data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const updateUser = () => {
    setUpdatingUser(true);
  };

  return (
    <div className="h-screen bg-gray-700 py-5 text-center">
      <div className="mt-10 flex gap-2 ">
        <UsersList users={users} loading={loading} updateUser={updateUser} />
        {!updatingUser && <SignupForm />}
        {updatingUser && <UpdateForm />}
      </div>
    </div>
  );
};

export default Admin;
