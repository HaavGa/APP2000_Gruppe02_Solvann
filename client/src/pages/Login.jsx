import axios from "axios";
import { useFormik } from "formik";
import logo from "../images/solvann-logo.png";
import { useSignIn } from "react-auth-kit";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState, useEffect } from "react";
import Spinner from "../components/utils/Spinner";
YupPassword(Yup);

/**
 * @author Håvard Garsrud
 * @source https://tailwindcomponents.com/component/login-page-glass-effect-and-background-image
 * Login-siden
 * @returns Login-siden
 */
const Login = () => {
  const signIn = useSignIn();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  /**
   * Oppretter et formik-objekt, som håndterer opprettholding og innsending av verdiene i skjemaet
   */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    /**
     * Metode tilbudt av Formik for å håndere posting av skjema
     * @param {object} values objekt med verdiene til input-feltene
     * @param {function} resetForm funksjon for å "blanke ut" feltene
     * etter innsending
     */
    onSubmit: (values, { resetForm }) => {
      submitHandler(values);
      resetForm(values);
    },
  });

  /**
   * Metoden sender et API-kall for å logge inn en bruker.
   * @param {object} values Objekt med innhentet data fra skjemaet
   */
  const submitHandler = async (values) => {
    setIsLoading(true);
    const baseUrl = "https://solvann.cyclic.app/api/users/login";
    try {
      const response = await axios.post(`${baseUrl}`, values);
      setIsLoading(false);
      /**
       * Metode tilbudt av "react-auth-kit" for å ta vare på token og sette authState, sånn at disse verdiene vil være tilgjengelige i applikasjonen
       */
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          _id: response.data._id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          isAdmin: response.data.isAdmin,
          email: response.data.email,
        },
      });
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      setError(err.response.data.message);
    }
  };
  /**
   * Metoden setter en errortekst hvis brukernavn eller passord er feil.
   * Bruker setTimeout() for å fjerne den etter to sekunder (2000 ms)
   */
  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setIsError(false);
      setError("");
    }, 2000);
    return () => clearTimeout(errorTimeout);
  }, [error]);
  return (
    <div className="flex h-screen w-full items-center justify-center bg-login bg-cover bg-no-repeat">
      <div className="max-sm:px-8 rounded-xl bg-gray-800/50 px-16 py-10 shadow-lg backdrop-blur-md">
        <div className="relative text-login-text">
          <div className="mb-8 flex flex-col items-center">
            <img
              src={logo}
              className="w-24 translate-y-4 scale-[3]"
              alt="solvann-logo"
            />
            <h1 className="mt-4 text-2xl">Solvann</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {isLoading && (
              <div className="absolute top-[5.3rem] left-20 scale-[0.4]">
                <Spinner />
              </div>
            )}
            {isError && (
              <div className="absolute left-[2.8rem] top-28 w-full text-red-400">
                {error}
              </div>
            )}

            <div className="mb-4 text-lg">
              <input
                id="email"
                className="text-text placeholder-text rounded-3xl border-none bg-login-input px-6 py-2 text-center shadow-lg outline-none ring-1 ring-login-input-light backdrop-blur-md placeholder:text-login-text focus:outline-none focus:ring-2 focus:ring-login-input-light"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                placeholder="navn@solvann.no"
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                id="password"
                className="rounded-3xl border-none bg-login-input px-6 py-2 text-center text-login-text placeholder-login-text shadow-lg outline-none ring-1 ring-login-input-light backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-login-input-light"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="Password"
                name="password"
                placeholder="*********"
              />
            </div>
            <div className="mt-8 flex justify-center text-lg">
              <button
                type="submit"
                className="rounded-3xl bg-login-input px-10 py-2 text-login-text shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-login-input-light"
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
