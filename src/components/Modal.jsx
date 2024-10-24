import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import closeImg from '../assets/close.svg';
import logo from '../assets/logo.png';
import classes from './Modal.module.css';

export default function Modal({ children, title, handleClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();
  }, []);

  return createPortal(
    <dialog ref={dialog} className={classes.modal} onClose={handleClose}>
      <button onClick={handleClose}>
        <img src={closeImg} alt="close" className={classes.close} />
      </button>
      <img src={logo} alt="logo" />
      <h2>{title}</h2>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}