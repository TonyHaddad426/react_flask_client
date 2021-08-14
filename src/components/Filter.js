import React from "react";
import classes from "./Filter.module.css";

const Filter = (props) => {
  const priceDropDownChangedHandler = (event) => {
    console.log("price dropdown selection: ", event.target.value);
    props.onPriceChangeFilter(event.target.value);
  };

  const alphabetDropDownChangedHandler = (event) => {
    console.log("alphabet dropdown selection: ", event.target.value);
    props.onAlphabetChangeFilter(event.target.value);
  };

  return (
    <div className={classes.filter}>
      {/* <div className={classes.filter__control}>
        <label>Sort by Price</label>
        <select
          value={props.priceFilterSelection}
          onChange={priceDropDownChangedHandler}
        >
          <option value="Desc">High to Low</option>
          <option value="Asc">Low to High</option>
        </select>
      </div>
      <div className={classes.filter__control}>
        <label>Sort Alphabetically</label>
        <select
          value={props.alphabetFilterSelection}
          onChange={alphabetDropDownChangedHandler}
        >
          <option value="Desc">A to Z</option>
          <option value="Asc">Z to A</option>
        </select>
  
      </div> */}
      <div className={classes.filter__controls}>
        <div className={classes.filter__control}>
        <label>Sort by Price</label>
          <table>
            <tr>
              {" "}
              <th>
                <button
                  type="button"
                  value={"Desc"}
                  onClick={priceDropDownChangedHandler}
                >
                  High to Low
                </button>
              </th>
              <th>
                <button
                  type="button"
                  value={"Asc"}
                  onClick={priceDropDownChangedHandler}
                >
                  Low to High
                </button>
              </th>
            </tr>
          </table>
        </div>
        <div className={classes.filter__control}>
        <label>Sort Alphabetically</label>
          <table>
            <tr>
              <th>
                <button
                  type="button"
                  value={"Desc"}
                  onClick={alphabetDropDownChangedHandler}
                >
                  A to Z
                </button>
              </th>
              <th>
                <button
                  type="button"
                  value={"Asc"}
                  onClick={alphabetDropDownChangedHandler}
                >
                  Z to A
                </button>
              </th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Filter;
