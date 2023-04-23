import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div className="text-5xl pt-56 flex flex-col items-center justify-center ">
      <h1 className="pb-5">Oops!</h1>
      <p>Sorry, an unexpected error has occurred</p>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
    </div>
  );
}
