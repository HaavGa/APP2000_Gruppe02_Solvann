import { useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const ModalChangePassword = () => {
  const [isOpen, setIsOpen] = useState(true);

  // formik logikk
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    // validere form
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Vennligst skriv inn nytt passord")
        .min(10, "Passordet må inneholde minst 10 tegn")
        .minLowercase(1, "Passordet må inneholde minst en liten bokstav")
        .minUppercase(1, "Passordet må inneholde minst en stor bokstav")
        .minNumbers(1, "Passordet må inneholde minst ett tall")
        .minSymbols(1, "Passordet må inneholde minst ett symbol"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passordene stemmer ikke")
        .required("Vennligst bekreft nytt passord"),
    }),

    // submit form
    onSubmit: (values, { resetForm }) => {
      submitHandler(values);
      resetForm(values);
    },
  });

  const submitHandler = (values) => {
    // @Håvard
    const baseUrl = "https://solvann.cyclic.app/api/users/updatePassword";
    const data = ({ password } = values);
    try {
      axios.post(`${baseUrl}`, data);
    } catch (err) {
      console.log(err.response.data.message);
    }
    // lagre nytt passord i databasen
    // Eventuelt gi bekreftelse til bruker
    // "https://solvann.cyclic.app/api/users/updatePassword"

    setIsOpen(false); //lukker modalen når "lagre passord"-knappen trykkes
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-x-0 inset-y-4 z-20 pt-[25vh]"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-700/80" />
      <div className="relative mx-auto max-w-xl rounded-xl bg-white text-center shadow-2xl ring-1 ring-black/5">
        <h1 className="pt-4 text-xl font-semibold">Endre passord</h1>
        <div className="flex justify-center">
          <form onSubmit={formik.handleSubmit} className="my-6">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase text-gray-600"
            >
              Nytt passord
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="********"
              className="input mt-1"
              onBlur={formik.handleBlur}
            />
            <div className="text-xs text-red-400">
              {formik.touched.password && formik.errors.password ? (
                formik.errors.password
              ) : (
                <div className="mb-4"></div>
              )}
            </div>
            <label
              htmlFor="confirmPassword"
              className="text-xs font-semibold uppercase text-gray-600"
            >
              Bekreft nytt passord
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              placeholder="********"
              className="input mt-1"
              onBlur={formik.handleBlur}
            />
            <div className="text-xs text-red-400">
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                formik.errors.confirmPassword
              ) : (
                <div className="mb-4"></div>
              )}
            </div>
            <button
              type="submit"
              className="btn bg-black text-white hover:bg-gray-900"
            >
              Lagre nytt passord
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalChangePassword;
