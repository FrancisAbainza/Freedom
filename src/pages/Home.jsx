import { auth } from "../config/firebase.js";
import { Outlet, Navigate } from "react-router-dom";
import classes from "./Home.module.css";
import Button from "../components/Button.jsx";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Home() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (<Navigate to={'/'} replace={true} />);
  }

  return (
    <>
      <main className={classes.home}>
        <section className={classes.profile}>
          <img src={logo} alt="logo" />
          <div>
            <h1>{currentUser.data.name}</h1>
            <h3>{currentUser.data.birthday}</h3>
            <Button
              outlineBtn
              linkBtn
              to={"edit"}
            >
              Edit profile
            </Button>
            <Button
              outlineBtn
              onClick={() => auth.signOut()}
            >
              Log out
            </Button>
          </div>
        </section>
        <section className={classes.content}>
          <p>Content goes here...</p>
        </section>
      </main>
      <Outlet />
    </>
  );
}