import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import Spinner from "../Spinner";
YupPassword(Yup);

const UpdateForm = ({ loadingEdit, savedValues, setUpdateForm }) => {
  if (loadingEdit) {
    return (
      <div className="flex w-[28rem] items-center justify-center bg-gray-700 text-white">
        <Spinner />
      </div>
    );
  }

  const { id, firstName, lastName, email, password, confirmPassword } =
    savedValues;
  const formik = useFormik({
    initialValues: {
      id: id,
      firstName: firstName,
      lastName: lastName,
      newEmail: email,
      newPassword: password,
      confirmNewPassword: confirmPassword,
    },
    enableReinitialize: true,
    // validere form
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, "Fornavnet må være på mindre enn 20 bokstaver")
        .required("Vennligst skriv inn fornavnet"),
      lastName: Yup.string()
        .max(20, "Etternavnet må være på mindre enn 20 bokstaver")
        .required("Vennligst skriv inn etternavnet"),
      newEmail: Yup.string()
        .email("Ugyldig epostadresse")
        .required("Vennligst skriv inn epost"),
      newPassword: Yup.string()
        .min(10, "Passordet må inneholde minst 10 tegn")
        .minLowercase(1, "Passordet må inneholde minst en liten bokstav")
        .minUppercase(1, "Passordet må inneholde minst en stor bokstav")
        .minNumbers(1, "Passordet må inneholde minst ett tall")
        .minSymbols(1, "Passordet må inneholde minst ett symbol"),
      confirmNewPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passordene stemmer ikke"
      ),
    }),

    // submit form
    onSubmit: (values, { resetForm }) => {
      submitHandler(values);
      resetForm(values);
      setUpdateForm(false);
    },
  });
  const submitHandler = (values) => {
    try {
      const baseUrl = "https://solvann.cyclic.app/api/users/profile";
      // const data = ({ id, firstName, lastName, newEmail, newPassword } =
      //   values);
      console.log(values);

      axios.patch(`${baseUrl}`, values);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[28rem] rounded-lg bg-white p-12">
      <h1 className="text-xl font-semibold">Oppdater bruker</h1>
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
          htmlFor="newEmail"
          className="mt-2 block text-xs font-semibold uppercase text-gray-600"
        >
          Ny e-post
        </label>
        <input
          id="newEmail"
          type="email"
          name="newEmail"
          value={formik.values.newEmail}
          onChange={formik.handleChange}
          placeholder="john.doe@company.com"
          className="input mt-2"
          onBlur={formik.handleBlur}
        />
        <div className="text-xs text-red-400">
          {formik.touched.newEmail && formik.errors.newEmail ? (
            formik.errors.newEmail
          ) : (
            <div className="mb-6"></div>
          )}
        </div>
        <label
          htmlFor="newPassword"
          className="mt-2 block text-xs font-semibold uppercase text-gray-600"
        >
          Nytt passord
        </label>
        <input
          id="newPassword"
          type="password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          placeholder="********"
          className="input mt-2"
          onBlur={formik.handleBlur}
        />
        <div className="text-xs text-red-400">
          {formik.touched.newPassword && formik.errors.newPassword ? (
            formik.errors.newPassword
          ) : (
            <div className="mb-6"></div>
          )}
        </div>
        <label
          htmlFor="confirmNewPassword"
          className="mt-2 block text-xs font-semibold uppercase text-gray-600"
        >
          Bekreft nytt passord
        </label>
        <input
          id="confirmNewPassword"
          type="newPassword"
          name="confirmNewPassword"
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          placeholder="********"
          className="input mt-2"
          onBlur={formik.handleBlur}
        />
        <div className="text-xs text-red-400">
          {formik.touched.confirmNewPassword &&
          formik.errors.confirmNewPassword ? (
            formik.errors.confirmNewPassword
          ) : (
            <div className="mb-4"></div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="admin"
            className="mt-2 inline text-xs font-semibold uppercase text-gray-600"
          >
            Administrator:
          </label>
          <input
            id="admin"
            type="checkbox"
            name="admin"
            value={false}
            onChange={formik.handleChange}
            className="mt-2 h-5 w-5 rounded-md"
          />
        </div>
        <button type="submit" className="btn w-full bg-black hover:bg-gray-900">
          Oppdater
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
