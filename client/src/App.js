import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/signUp";
import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import Members from "./pages/members"
import LogIn from "./pages/login/login"
// import isAuthenticated from "./utils/isauthenticated"
import SubmitBird from "./pages/submitBird.js"
import GoogleLogin from "./pages/googleLogin.js"
import  MyComponent  from "./pages/map"

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
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

          <Route exact path={"/members"}>
            <Members />
            </Route>

          <Route exact path={"/submitBird"}>
            <SubmitBird />
          </Route>
          <Route exact path={"/googleLogin"}>
            <GoogleLogin />
          </Route>
//           <Route exact path={"/members"} render={(req)=>(
//             isAuthenticated(req) ?  <Members /> : <LogIn />
//             )}/>

          <Route>
            <NoMatch />
          </Route>
            {/* <MyComponent /> DISPLAYS GOOGLE MAP */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
