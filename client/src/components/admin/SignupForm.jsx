import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const SignupForm = () => {
  // formik logikk
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        .email("Ugyldig epostadresse")
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
    // må sjekke om eposten allerede finnes i db
    const data = ({ firstName, lastName, email, password } = values);
    try {
      Axios.post("http://localhost:5000/api/users/", data);
      console.log("POST user");
      if (import.meta.env.DEV) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-1/3 rounded-lg bg-white p-12">
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
              placeholder="John"
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
              placeholder="Doe"
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
          placeholder="john.doe@company.com"
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
          Bekreft password
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
        <button type="submit" className="btn w-full bg-black hover:bg-gray-900">
          Registrer
        </button>
        {/* <p className="mt-4 inline-block cursor-pointer justify-between text-sm text-gray-500 hover:text-black">
          Allerede registrert?
        </p> */}
      </form>
    </div>
  );
};

export default SignupForm;
