import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const SignupForm = () => {
  const [error, setError] = useState("");
  // formik logikk
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
    },

    // validere form
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, "Fornavnet må være på mindre enn 20 bokstaver")
        .required("Vennligst skriv inn fornavnet"),
      lastName: Yup.string()
        .max(20, "Etternavnet må være på mindre enn 20 bokstaver")
        .required("Vennligst skriv inn etternavnet"),
      email: Yup.string()
        .matches(/[a-zA-Z]+@solvann.no/, "Ikke gyldig solvann-adresse")
        .required("Vennligst skriv inn eposten"),
      password: Yup.string()
        .required("Vennligst skriv inn passordet")
        .min(10, "Passordet må inneholde minst 10 tegn")
        .minLowercase(1, "Passordet må inneholde minst en liten bokstav")
        .minUppercase(1, "Passordet må inneholde minst en stor bokstav")
        .minNumbers(1, "Passordet må inneholde minst ett tall")
        .minSymbols(1, "Passordet må inneholde minst ett symbol"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passordene stemmer ikke")
        .required("Vennligst bekreft passordet"),
    }),

    // submit form
    onSubmit: (values, { resetForm }) => {
      submitHandler(values);
      resetForm(values);
    },
  });
  const submitHandler = (values) => {
    const baseUrl = "https://solvann.cyclic.app/api/users/";
    const data = ({ firstName, lastName, email, password, isAdmin } = values);
    try {
      console.log(isAdmin);
      axios.post(`${baseUrl}`, data);
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="w-[28rem] rounded-lg bg-white p-12">
      <h1 className="text-xl font-semibold">Legg til bruker til Solvann</h1>
      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="flex justify-between gap-3">
          <span className="w-1/2">
            <label
              htmlFor="firstName"
              className="block text-xs font-semibold uppercase text-gray-600"
            >
              Fornavn
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              placeholder="Ola"
              className="input mt-2"
              onBlur={formik.handleBlur}
            />
            <div className="text-xs text-red-400">
              {formik.touched.firstName && formik.errors.firstName ? (
                formik.errors.firstName
              ) : (
                <div className="mb-4"></div>
              )}
            </div>
          </span>
          <span className="w-1/2">
            <label
              htmlFor="lastName"
              className="block text-xs font-semibold uppercase text-gray-600"
            >
              Etternavn
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              placeholder="Nordmann"
              className="input mt-2"
              onBlur={formik.handleBlur}
            />
            <div className="text-xs text-red-400">
              {formik.touched.lastName && formik.errors.lastName ? (
                formik.errors.lastName
              ) : (
                <div className="mb-4"></div>
              )}
            </div>
          </span>
        </div>
        <label
          htmlFor="email"
          className="mt-2 block text-xs font-semibold uppercase text-gray-600"
        >
          E-post
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="onordmann@solvann.no"
          className="input mt-2"
          onBlur={formik.handleBlur}
        />
        <div className="text-xs text-red-400">
          {formik.touched.email && formik.errors.email ? (
            formik.errors.email
          ) : (
            <div className="mb-6"></div>
          )}
        </div>
        <label
          htmlFor="password"
          className="mt-2 block text-xs font-semibold uppercase text-gray-600"
        >
          Passord
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="********"
          className="input mt-2"
          onBlur={formik.handleBlur}
        />
        <div className="text-xs text-red-400">
          {formik.touched.password && formik.errors.password ? (
            formik.errors.password
          ) : (
            <div className="mb-6"></div>
          )}
        </div>
        <label
          htmlFor="confirmPassword"
          className="mt-2 block text-xs font-semibold uppercase text-gray-600"
        >
          Bekreft passord
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          placeholder="********"
          className="input mt-2"
          onBlur={formik.handleBlur}
        />
        <div className="text-xs text-red-400">
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            formik.errors.confirmPassword
          ) : (
            <div className="mb-4"></div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="isAdmin"
            className="mt-2 inline text-xs font-semibold uppercase text-gray-600"
          >
            Administrator:
          </label>
          <input
            id="isAdmin"
            type="checkbox"
            name="isAdmin"
            value={formik.values.isAdmin}
            onChange={formik.handleChange}
            className="mt-2 h-5 w-5 rounded-md"
          />
        </div>
        <div className="my-3 text-center text-red-400">{error}</div>
        <button type="submit" className="btn w-full bg-black hover:bg-gray-900">
          Registrer
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
