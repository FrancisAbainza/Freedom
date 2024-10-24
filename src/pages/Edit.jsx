import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import Error from "../components/Error.jsx";
import classes from './Register.module.css';
import { useAuth } from "../contexts/AuthContext.jsx";
import { stringToDate } from "../util/formatting.js";
import useFirebase from "../hooks/useFirebase.js";

export default function Edit() {
  const { currentUser, handleEditProfile } = useAuth();
  const {isLoading, error, callAction, clearError} = useFirebase(handleEditProfile);
  const { name, birthday } = currentUser.data;
  const navigate = useNavigate();

  function handleCloseRegister() {
    navigate('..');
  }

  async function handleSubmit(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way
    const formData = new FormData(event.target);
    const editProfileData = Object.fromEntries(formData.entries());

    await callAction(editProfileData);
    navigate('..');
  }

  return (
    <>
      <Modal title="Edit profile" handleClose={handleCloseRegister}>
        <form className={classes.register} onSubmit={handleSubmit}>
          <Input
            defaultValue={name}
            label="Name"
            type="text"
            name="name"
            autoComplete="name"
            onChange={clearError}
            required
          />
          <Input
            defaultValue={stringToDate(birthday)}
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