import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";
import React from "react";
const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      all{" "}
      <input
        id="myRadio_1"
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
        defaultChecked
      ></input>
      important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      ></input>
      nonimportant{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      ></input>
    </div>
  );
};

export default VisibilityFilter;
