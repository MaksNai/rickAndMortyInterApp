import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;
  console.error(error);

  switch (typeof error) {
    case 'object':
      if (isRouteErrorResponse(error)) {
        errorMessage = error.error?.message || error.statusText;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        console.error(error);
        errorMessage = 'Unknown error';
      }
      break;
   
    case 'string':
      errorMessage = error;
      break;
   
    default:
      console.error(error);
      errorMessage = 'Unknown error';
   }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
