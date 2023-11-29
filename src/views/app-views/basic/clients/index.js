import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import List from "./list";
import Groups from "./groups";
import EditClient from "./edit-client";
const Clients = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/clients`} />
      <Route path={`${match.url}/list`} component={List} />
      <Route path={`${match.url}/groups`} component={Groups} />
      <Route path={`${match.url}/edit-client/:id`} component={EditClient} />
    </Switch>
  );
};

export default Clients;
