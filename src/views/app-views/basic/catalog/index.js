import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Goods from "./goods";
import Categories from "./categories";
import Collections from "./collections";
import Combo from "./combo";

const Catalog = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/goods`} />
      <Route path={`${match.url}/goods`} component={Goods} />
      <Route path={`${match.url}/categories`} component={Categories} />
      <Route path={`${match.url}/collections`} component={Collections} />
      <Route path={`${match.url}/combo`} component={Combo} />
    </Switch>
  );
};

export default Catalog;
