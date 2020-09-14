import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import EditProduct from "./EditProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/edit-product/:id" exact component={EditProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
