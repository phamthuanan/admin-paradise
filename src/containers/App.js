import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./home.container";
import LocationManagerContainer from "./locationManager.container";
import AccountManagerContainer from "./accountManager.container";
import LoginContainer from "./login.container";
import ReviewTourDesign from "./reviewTourDesign.container"
import ContactManagerContainer from "./contactManager.container"
import ProviderManagerContianer from "./providerManager.container"
import TourManagerContainer from "./tourManager.container"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/locationmanager" component={LocationManagerContainer} />
          <Route exact path="/accountmanager" component={AccountManagerContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/reviewtourdesign" component={ReviewTourDesign} />
          <Route exact path="/contactmanager" component={ContactManagerContainer} />
          <Route exact path="/providermanager" component={ProviderManagerContianer} />
          <Route exact path="/tourmanager" component={TourManagerContainer} />
        </Switch>
      </Router>
    );
  }
}
export default App;
