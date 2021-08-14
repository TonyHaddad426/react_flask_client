import React, { useState } from "react";
import "./Item.css";
import CSSTransition from "react-transition-group/CSSTransition";
function Item(props) {
  // changes to state cause child components to be rendered / updated again
  useState(); // useState is a React hook that returns an array

  return (
    <CSSTransition
              
    classNames="fade"
    timeout={20000}
  >
    <li className="item">
      <div>{props.store}</div>
      <div className="item__description">
        <h2>{props.title}</h2>
        <div className="item__price">${props.amount}</div>
      </div>
    </li>
    </CSSTransition>
  );
}

export default Item;
