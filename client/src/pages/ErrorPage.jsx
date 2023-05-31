import { useNavigate } from "react-router-dom";
import img404 from "../images/404img.png";

/**
 * @author Mari Hansen
 * Siden som vises hvis bruker navigerer til en rute som ikke finnes
 * Bruker funksjon fra "react-router-dom" som navigerer til valgt pat
 * @returns Error-siden
 */
const ErrorPage = () => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="text-text flex h-screen flex-col items-center justify-center bg-bg-main">
        <img className="w-1/4" src={img404} alt="feilmelding" />
        <p className="text-4xl text-white">Beklager, denne siden finnes ikke</p>
        <button
          className="btn bg-black text-white hover:bg-gray-900"
          onClick={toHome}
        >
          Gå tilbake
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
