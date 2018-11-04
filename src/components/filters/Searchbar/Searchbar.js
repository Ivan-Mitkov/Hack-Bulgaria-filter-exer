import React from "react";
import classes from './Searchbar.module.css'

const Searchbar = props => {
  return (
    <input
    
      type="search"
      placeholder="Search for..."
      value={props.searchedWord}
      onChange={props.handleInputChange}
      className={classes.textSize}
    />
  );
};

export default Searchbar;
