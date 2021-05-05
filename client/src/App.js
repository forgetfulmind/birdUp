import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/signUp";
import NoMatch from "./pages/NoMatch";
import Members from "./pages/members/members"
import EditProfile from "./pages/editProfile/editProfile";
import LogIn from "./pages/login/login"
import SubmitBird from "./pages/submitBird/submitBird.js"
import  MapContainer  from "./pages/earth/earth"
import { connect } from "react-redux";
import UserPosts from "./pages/UserPosts/UserPosts"


const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

function App({ isSignedIn}) {

// console.log(isSignedIn, "isSignedIn")

  if(isSignedIn){
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={"/"}> 
            <Members/>
          </Route>
          <Route exact path={"/members"}>
            <Members />
          </Route>
          <Route exact path={"/edit"}>
            <EditProfile />
          </Route>
          <Route exact path={"/submitBird"}>
            <SubmitBird />
          </Route>
          <Route exact path={"/earth"}>
            <MapContainer /> 
          </Route>
          <Route exact path={"/post/:id"}>
            <UserPosts />
          </Route>
          <Route exact path={"/logout"}>
            <LogIn />
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
      <Router>
        <Route> 
          <LogIn />
        </Route>
      </Router>
    )
  }
}


export default connect(mapStateToProps)(App);
