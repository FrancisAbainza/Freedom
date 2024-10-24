import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import Error from "../components/Error.jsx";
import classes from './Login.module.css';
import { useAuth } from "../contexts/AuthContext.jsx";
import useFirebase from "../hooks/useFirebase.js";

export default function Login() {
  const { handleLogin } = useAuth();
  const {isLoading, error, callAction, clearError} = useFirebase(handleLogin);
  const navigate = useNavigate();

  function handleCloseLogin() {
    navigate('..');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginData = Object.fromEntries(formData.entries());

    callAction(loginData);
  }

  return (
    <>
      <Modal title="Log in" handleClose={handleCloseLogin}>
        <form className={classes.login} onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={clearError}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={clearError}
            required
          />
          {error && <Error message={error} />}
          <Button disabled={isLoading}>{isLoading ? "Loading..." : "Next"}</Button>
        </form>
      </Modal>
    </>
  );
}