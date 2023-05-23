import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center text-5xl">
      <h1 className="pb-5">Oops!</h1>
      <p className="pb-5">Sorry, an unexpected error has occurred!</p>
      <p>
        Please&nbsp;
        <span className="cursor-pointer underline" onClick={() => toHome()}>
          go back
        </span>
      </p>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
    </div>
  );
}
