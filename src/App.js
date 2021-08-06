import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Items from "./components/Items.js";
import ListItems from "./components/User/ListItems";
import ListAdminForms from "./components/Admin/ListAdminForms";
import MainHeader from "./components/MainHeader";
import AuthForm from "./components/Authentication/AuthForm";
import Spinner from "./components/Spinner";
import AuthContext from "./components/Store/Auth-Context";



function App() {
  const authCtx = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [storeDropdownList, setStoreDropdownList] = useState([]);
  const [isStoreListUpdated, setIsStoreListUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createItemHandler = (data) => {
    fetch(`https://store-item-restful-api.herokuapp.com/item/${data.item}`, {
      method: "POST",
      body: JSON.stringify({
        item_price: data.item_price,
        store_id: data.store_id,
        store_name: data.store,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${authCtx.token}`,
      },
    })
      .then((response) => {
        console.log("response", response);
        return response.json(); // return promise
      })
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        }
        alert("New store item created succesfully. You can now search for it!")
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    // UPDATE STORE DROPDOWN LIST SINCE NEW STORE WAS ADDED
    fetch(`https://store-item-restful-api.herokuapp.com/stores`)
      .then((response) => {
        return response.json(); // return promise
      })
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        }
        console.log("useEffect read stores response", data.items);
        setStoreDropdownList(data.items);
      })
      .catch((err) => setError(err.message));
  }, [isStoreListUpdated]);

  const createStoreHandler = (data) => {
    console.log(data.store);
    fetch(`https://store-item-restful-api.herokuapp.com/store/${data.store}`, {
      method: "POST",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${authCtx.token}`,
      },
    })
      .then((response) => {
        setIsStoreListUpdated((prevState) => {
          return !prevState;
        });
        return response.json(); // return promise
      })
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        }
        alert("New store created succesfully. You can now search for it!")
      })
      .catch((err) => setError(err.message));

    setIsLoading(false);
    return;
  };

  const fetchItemsHandler = (data) => {
    let arr = [];
    console.log(data);
    setIsLoading(true);
    setError(null);
    if (data.store.trim().length == 0 && data.item.trim().length == 0) {
      setError("Enter an item to check across all stores");
      setIsLoading(false);
    }
    // the input to fetchItemsHandler is passed from components UserForm.js -> ListItems.js -> App.js

    // a store and item value were entered by the user
    if (data.store.trim().length > 0 && data.item.trim().length > 0) {
      console.log("a store and item value were entered by the user");
      fetch(`https://store-item-restful-api.herokuapp.com/store/${data.store}/${data.item}`)
        .then((response) => {
          console.log("response", response);
          return response.json(); // return promise
        })
        .then((data) => {
          if (data.message) {
            throw new Error(data.message);
          }

          arr.push(data);
          setItems(arr);
          console.log(items);
        })
        .catch((err) => setError(err.message));

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      console.log("Displaying items state", items);
      return;
    }
    // only a store value was entered by the user
    if (data.store.trim().length > 0 && data.item.trim().length == 0) {
      console.log("only a store value was entered by the user", data.store);
      fetch(`https://store-item-restful-api.herokuapp.com/store/${data.store}`)
        .then((response) => {
          console.log("response", response);
          return response.json(); // return promise
        })
        .then((data) => {
          if (data.message) {
            throw new Error(data.message);
          }

          console.log(data);
          setItems(data.items);
        })
        .catch((err) => setError(err.message));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      // setIsLoading(false)
      console.log("Displaying items state", items);
      return;
    }
    // only an item value was entered by the user
    if (data.store.trim().length == 0 && data.item.trim().length > 0) {
      console.log("only an item value was entered by the user");
      fetch(`https://store-item-restful-api.herokuapp.com/item/${data.item}`)
        .then((response) => {
          console.log("response", response);
          return response.json(); // return promise
        })
        .then((data) => {
          if (data.message) {
            throw new Error(data.message);
          }

          console.log(data);
          setItems(data);
        })
        .catch((err) => setError(err.message));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      // setIsLoading(false)
      console.log("Displaying items state", items);
      return;
    }

    return;
  };

  console.log("Updated store dropdown list", storeDropdownList);
  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      <MainHeader />
      <main>
        <Route exact path="/">
          <div>
            <ListItems
              setError={errorHandler}
              error={error}
              storeNameList={storeDropdownList}
              onAddItems={fetchItemsHandler}
            />
            {!isLoading && items.length > 0 && <Items items={items} />}
            {!isLoading && items.length === 0 && !error && (
              <p>Found no items</p>
            )}
            {isLoading && <Spinner />}
            {!isLoading && error && <p>{error}</p>}
          </div>
        </Route>

        {!authCtx.isLoggedIn && (
          <Route path="/login">
            <AuthForm
              error={error}
              setError={setError}
              errorHandler={errorHandler}
            />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="/admin">
            <ListAdminForms
              setError={errorHandler}
              error={error}
              createItemHandler={createItemHandler}
              stores={storeDropdownList}
              createStoreHandler={createStoreHandler}
            ></ListAdminForms>
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="*">
            <Redirect to="/admin" />
          </Route>
        )}

        {!authCtx.isLoggedIn && (
          <Route path="*">
            <Redirect to="/" />
          </Route>
        )}
      </main>
    </div>
  );
}

export default App;
