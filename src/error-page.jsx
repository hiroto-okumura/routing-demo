import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error-page">
      <h1>Error Cateched</h1>
      <p>sorry, an unexpected errror has occered</p>
      <p>
        <i>{error.statustext || error.message}</i>
      </p>
    </div>
  );
}
