import ApiData from "../components/ApiData";
import SignupForm from "../components/SignupForm";

const Home = () => {
  return (
    <div className="grid h-screen grid-cols-1 items-center bg-gray-700 lg:grid-cols-2">
      <ApiData />
      <div className="mx-auto">
        <SignupForm />
      </div>
    </div>
  );
};

export default Home;
