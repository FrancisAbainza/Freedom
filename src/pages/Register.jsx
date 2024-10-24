import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import Error from "../components/Error.jsx";
import classes from './Register.module.css';
import { useAuth } from "../contexts/AuthContext.jsx";
import useFirebase from "../hooks/useFirebase.js";


export default function Register() {
  const { handleRegister } = useAuth();
  const {isLoading, error, callAction, clearError} = useFirebase(handleRegister);
  const navigate = useNavigate();

  function handleCloseRegister() {
    navigate('..');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const registerData = Object.fromEntries(formData.entries());

    callAction(registerData);
  }

  return (
    <>
      <Modal title="Sign up" handleClose={handleCloseRegister}>
        <form className={classes.register} onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            name="name"
            autoComplete="name"
            onChange={clearError}
            required
          />
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
            autoComplete="new-password"
            onChange={clearError}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmedPassword"
            autoComplete="new-password"
            onChange={clearError}
            required
          />
          <Input
            label="Date of birth"
            type="date"
            name="birthday"
            autoComplete="bday"
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