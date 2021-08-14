import React, { useState, useEffect } from "react";
import Item from "./Item";
import "./Items.css";
import Filter from "./Filter";
function Items(props) {
  const [priceFilter, setPriceFilter] = useState({
    value: "",
    lastUpdated: "",
  });
  const [alphabetFilter, setAlphabetFilter] = useState({
    value: "",
    lastUpdated: "",
  });

  let filteredItems = props.items;

  const priceFilterChangedHandler = (selectedPriceFilter) => {
    setPriceFilter({ value: selectedPriceFilter, lastUpdated: new Date() });
  };

  const alphabetFilterChangedHandler = (selectedAlphabetFilter) => {
    setAlphabetFilter({
      value: selectedAlphabetFilter,
      lastUpdated: new Date(),
    });
  };


  if (alphabetFilter.lastUpdated > priceFilter.lastUpdated) {

    if (alphabetFilter.value === "Asc") {
      filteredItems = props.items.sort((a, b) =>
        b.item_name.localeCompare(a.item_name)
      );
    }

    if (alphabetFilter.value === "Desc") {
      filteredItems = props.items.sort((a, b) =>
        a.item_name.localeCompare(b.item_name)
      );
    }
    console.log("alphabet selection: ", alphabetFilter)
  }

  if (alphabetFilter.lastUpdated < priceFilter.lastUpdated) {
    
    if (priceFilter.value === "Asc") {
      filteredItems = props.items.sort((a, b) => a.item_price - b.item_price);
    }
    if (priceFilter.value === "Desc") {
      filteredItems = props.items.sort((a, b) => b.item_price - a.item_price);
      console.log("price selection: ", priceFilter)
    }
  }

  return (
    <div className="items">
      <Filter
        priceFilterSelection={priceFilter.value}
        alphabetFilterSelection={alphabetFilter.value}
        onPriceChangeFilter={priceFilterChangedHandler}
        onAlphabetChangeFilter={alphabetFilterChangedHandler}
      />
      {
        /* the map method takes an array and executes a function on each item within that array */
        filteredItems.map((item) => (
          <Item
            key={item.store_id + item.item_name}
            store={item.store_name}
            title={item.item_name}
            amount={item.item_price}
          />
        ))
      }
    </div>
  );
}

export default Items;
