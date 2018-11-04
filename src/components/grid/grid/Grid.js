import React from "react";
import uuid4 from "uuid4";
import classes from "./Grid.module.css";
// props.data props.click props.numpad
const Grid = props => {
  let rows = [];

  for (let i = 0; i < props.data.length; i++) {
    let data = props.data[i];
    // console.log(props.data[i].keyName || 1);
    let row = (
      <div
        key={uuid4()}
        className={classes.item}
        // onClick={() => props.click(data)}
      >
        <div>
          <div className={classes.title}>{data.title}</div>
          <div>{data.type}</div>
        </div>
      </div>
    );

    rows.push(row);
  }
  return <div className={`${classes.container}`}>{rows}</div>;
};
export default Grid;
