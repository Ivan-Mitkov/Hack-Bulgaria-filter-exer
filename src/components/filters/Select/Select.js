import React from "react";
import classes from "./Select.module.css";

const Select = props => {
  return (
    <div>
      
      <select
        onChange={props.handleSelectChange}
        value={props.selectValue}
        className={classes.textSize}
        
      >
        {props.options.map((x,i) => {
          if(i===0){
            return<option key={x.id} value='' className={classes.inactivItem}>Company type</option>
          }
          else{
            return (
              <option key={x.id} value={x.title} className={classes.item}>
                {x.title}
              </option>
            );
          }
         
        })}
      </select>
    </div>
  );
};
export default Select;
