import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/signUp";
import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import Members from "./pages/members/members"
import LogIn from "./pages/login/login"
// import isAuthenticated from "./utils/isauthenticated"
import SubmitBird from "./pages/submitBird.js"
// import GoogleLogin from "./pages/login/login.js"
import  MapContainer  from "./pages/earth"
import { connect } from "react-redux";


function App({ isSignedIn}) {
  if(isSignedIn){
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
        {/* <Route exact path={"/"}>
            <LogIn />
          </Route>
          <Route exact path={"/login"}>
            <LogIn />
          </Route> */}
          {/* <Route exact path={"/members"} render={(req)=>(
            isSignedIn ?  <Members /> : <LogIn />
            )} /> */}
          {/* <Route exact path={"/submitbird"} render={(req)=>(
            isSignedIn ?  <SubmitBird /> : <LogIn />
            )} /> */}
          {/* {/* <Route exact path={"/earth"} render={(req)=>(
            isSignedIn ?  <MapContainer />  : <LogIn />
            )} /> */}
                      <Route exact path={"/logout"}>
                      <LogIn />
                      </Route>
                      <Route exact path={"/"}>
                      <Members />
                      </Route>
                      <Route exact path={"/members"}>
                      <Members />
                      </Route>
                      <Route exact path={"/submitBird"}>
                        <SubmitBird />
                      </Route>
                      <Route exact path={"/earth"}>
                      <MapContainer /> 
                      </Route>
                      <Route>
                        <NoMatch />
                      </Route>
        </Switch>
      </div>
    </Router>
  );
  }else{
    return (
      <LogIn />
      // <Router>
      //   <div>
      //     <Switch>
      //     <Route exact path={"/"}>
      //         <LogIn />
      //       </Route>
      //       <Route exact path={"/login"}>
      //         <LogIn />
      //       </Route>
      //       </Switch>
      //       </div>
      //  </Router>
    )
  }
}


const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(App);
