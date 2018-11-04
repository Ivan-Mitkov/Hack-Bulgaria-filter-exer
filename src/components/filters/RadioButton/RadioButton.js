import React from "react";
import classes from "./RadioButton.module.css";

const RadioButton = props => {
  return (
    <div>
      <input
        type="checkbox"
        id="isActive"
        name="isActive"
        value="isActive"
       
        checked={props.checked}
        onClick={() => props.handleIsChecked()}
        className={classes.textSize}
      />
      <label htmlFor="isActive">Is active</label>
    </div>
  );
};

export default RadioButton;
