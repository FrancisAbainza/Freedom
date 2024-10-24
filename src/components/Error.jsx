import classes from './Error.module.css';

export default function Error({ message }) {
  return (
    <div className={classes.error}>
      <p>{message}</p>
    </div>
  );
}