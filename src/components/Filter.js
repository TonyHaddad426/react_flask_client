import React from 'react'
import classes from './Filter.module.css' 

const Filter = (props) => {
    const priceDropDownChangedHandler = (event) => {
        props.onPriceChangeFilter(event.target.value)
    }

    const alphabetDropDownChangedHandler = (event) => {
      props.onAlphabetChangeFilter(event.target.value)
  }

    return (
        <div className={classes.filter}>
          <div className={classes.filter__control}>
            <label>Sort by Price</label>
            <select value={props.priceFilterSelection} onChange={priceDropDownChangedHandler}>
              <option value='Desc'>High to Low</option>
              <option value='Asc'>Low to High</option>
            </select>
          </div>
          <div className={classes.filter__control}>
            <label>Sort Alphabetically</label>
            <select value={props.alphabetFilterSelection} onChange={alphabetDropDownChangedHandler}>
              <option value='Desc'>A to Z</option>
              <option value='Asc'>Z to A</option>
            </select>
          </div>
        </div>
      );
}

export default Filter; 