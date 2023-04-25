import { useState, useEffect } from "react";
import SignupForm from "../components/admin/SignupForm";
import UsersList from "../components/admin/UsersList";
import Axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await Axios.get("http://localhost:5000/api/users/");
      setUsers(response.data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="h-screen bg-gray-700 py-5 text-center">
      <div className="mt-10 flex gap-2 ">
        <UsersList users={users} loading={loading} />
        <SignupForm />
      </div>
    </div>
  );
};

export default Admin;
