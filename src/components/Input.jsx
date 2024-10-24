import { useState } from "react";
import classes from "./Input.module.css";

export default function Input({ label, ...props }) {
  const [id, setId] = useState(Math.random().toString(36).substr(2, 9));

  return (
    <div className={classes.container}>
      <label htmlFor={id} className={classes.label}>{label}</label>
      <input id={id} {...props} className={classes.input} />
    </div>
  );
}