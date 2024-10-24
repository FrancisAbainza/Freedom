import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error.status)

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  return (
    <>
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
}
