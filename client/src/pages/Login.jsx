import axios from "axios";
import { useFormik } from "formik";
import logo from "../images/solvann-logo.png";
import { useSignIn } from "react-auth-kit";

const Login = () => {
  const signIn = useSignIn();
  // formik logikk
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // submit form
    onSubmit: (values) => {
      submitHandler(values);
    },
  });
  const submitHandler = async (values) => {
    const baseUrl = "https:solvann.cyclic.app/api/users/auth";
    const data = values;
    try {
      const response = await axios.post(`${baseUrl}`, data);

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { _id: response.data._id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-login bg-cover bg-no-repeat">
      <div className="max-sm:px-8 rounded-xl bg-gray-800/50 px-16 py-10 shadow-lg backdrop-blur-md">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src={logo} className="w-24" alt="solvann-logo" />
            <h1 className="mt-4 text-2xl">Solvann</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 text-lg">
              <input
                id="email"
                className="rounded-3xl border-none bg-orange-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                placeholder="id@email.com"
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                id="password"
                className="rounded-3xl border-none bg-orange-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="Password"
                name="password"
                placeholder="*********"
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="submit"
                className="rounded-3xl bg-orange-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-orange-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
