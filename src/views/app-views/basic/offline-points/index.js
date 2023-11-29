import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Addresses from "./addresses";
import Geofences from "./geofences";
const OfflinePoints = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/offline-points`}
      />
      <Route path={`${match.url}/addresses`} component={Addresses} />
      <Route path={`${match.url}/geofences`} component={Geofences} />
    </Switch>
  );
};

export default OfflinePoints;
