import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/signUp";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Members from "./pages/members"
import LogIn from "./pages/login"
import isAuthenticated from "./utils/isauthenticated"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
        <Route exact path={"/"}>
            <LogIn />
          </Route>
          <Route exact path={"/login"}>
            <LogIn />
          </Route>
          <Route exact path={"/signup"}>
            <SignUp />
          </Route>
          <Route exact path={"/members"} render={(req)=>(
            isAuthenticated(req) ?  <Members /> : <LogIn />
          )}/>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
