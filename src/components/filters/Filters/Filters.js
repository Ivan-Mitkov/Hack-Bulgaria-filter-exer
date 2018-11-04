import React from "react";
import classes from "./Filters.module.css";

import Searchbar from "../Searchbar/Searchbar";
import Select from "../Select/Select";
import RadioButton from "../RadioButton/RadioButton";

const Filters = props => {
  return (
    <div className={classes.pos}>
      <Searchbar
        handleInputChange={props.handleInputChange}
        search={props.search}
        searchedWord={props.searchedWord}
      />
      <Select
        options={props.options}
        selectValue={props.selectValue}
        handleSelectChange={props.handleSelectChange}
      />
      <RadioButton
        handleIsChecked={props.handleIsChecked}
        checked={props.checked}
      />
    </div>
  );
};

export default Filters;
