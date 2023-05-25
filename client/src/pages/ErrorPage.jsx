import { useNavigate } from "react-router-dom";
import img404 from "../images/404img.png"

const ErrorPage = () => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center	 bg-gray-700 text-white">
        <img className="w-1/4" src={img404} alt="feilmelding" />
        <p className="text-4xl">Beklager, denne siden finnes ikke</p>
        <button className="btn bg-black hover:bg-gray-900" onClick={toHome}>
          Gå tilbake
        </button>
      </div>
    </>
  );
}

export default ErrorPage; 