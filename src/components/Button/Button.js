import React from "react";
import "./Button.css";

const Button = React.forwardRef((props, ref) => {
  return (
    <button ref={ref} onClick={props.onClick} id={props.id} className="mainBtn">
      {props.children}
    </button>
  );
});

export default Button;
