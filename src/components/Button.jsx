import { Link } from 'react-router-dom';
import classes from './Button.module.css';

export default function Button({ children, outlineBtn, linkBtn, ...props }) {
  let cssClasses = outlineBtn ? classes.outlined : classes.filled;
  cssClasses += ` ${classes.button}`;

  if (linkBtn) {
    return (
      <Link className={cssClasses} {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={cssClasses} {...props}>
        {children}
      </button>
    );
  }
}