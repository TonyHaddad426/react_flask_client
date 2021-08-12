import React, { useState } from "react";
import Item from "./Item";
import "./Items.css";
import Filter from "./Filter";
function Items(props) {
  const [priceFilter, setPriceFiler] = useState("");
  const [alphabetFilter, setAlphabetFiler] = useState("");

  let filteredItems = props.items;

  const priceFilterChangedHandler = (selectedPriceFilter) => {
    setPriceFiler(selectedPriceFilter);
  };

  if (priceFilter === "Asc") {
    filteredItems = props.items.sort((a, b) => a.item_price - b.item_price);
  }
  if (priceFilter === "Desc") {
    filteredItems = props.items.sort((a, b) => b.item_price - a.item_price);
  }

  const alphabetFilterChangedHandler = (selectedAlphabetFilter) => {
    setAlphabetFiler(selectedAlphabetFilter);
  };

  if (alphabetFilter === "Asc") {
    filteredItems = props.items.sort((a, b) => b.item_name.localeCompare(a.item_name));
  }

  if (alphabetFilter === "Desc") {
    filteredItems = props.items.sort((a, b) => a.item_name.localeCompare(b.item_name))
  }
  
console.log(filteredItems)

  return (
    <div className="items">
      <Filter
        priceFilterSelection={priceFilter}
        alphabetFilterSelection={alphabetFilter}
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
