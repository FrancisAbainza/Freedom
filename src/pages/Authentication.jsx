import { Navigate, Outlet } from "react-router-dom";
import Button from "../components/Button.jsx";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import classes from "./Authentication.module.css";
import { useAuth } from "../contexts/AuthContext.jsx";
import useFirebase from "../hooks/useFirebase.js";

export default function Authentication() {
  const { currentUser, isUpdatingUser, handleSignInWithGoogle } = useAuth();
  const { callAction } = useFirebase(handleSignInWithGoogle);

  if (currentUser) {
    return (<Navigate to={'/home'} replace={true} />);
  }

  if (isUpdatingUser) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <main className={classes.authentication}>
        <img src={logo} alt="freedom form application logo" />
        <div>
          <h1>Freedom awaits</h1>
          <h2>Join now.</h2>
          <Button linkBtn to={"login"}>Log in</Button>
          <Button linkBtn to={"register"}>Create account</Button>
          <p>or</p>
          <Button outlineBtn onClick={callAction}>
            <img src={google} alt="google logo" className={classes.google} />
            Continue with Google
          </Button>
        </div>
      </main>
      <Outlet />
    </>
  );
}