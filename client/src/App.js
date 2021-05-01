// import React from "react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/signUp";
import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import Members from "./pages/members/members"
import LogIn from "./pages/login/login"
// import isAuthenticated from "./utils/isauthenticated"
import SubmitBird from "./pages/submitBird.js"
// import GoogleLogin from "./pages/login/login.js"
import  MapContainer  from "./pages/earth/earth"
import { connect } from "react-redux";
import UserPosts from "./pages/UserPosts/UserPosts"


function App({ isSignedIn}) {
const [signIn, setSignin] = useState()

useEffect(()=>{
  setSignin(isSignedIn)
},[isSignedIn])


  if(signIn){
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
        {/* {  <Route exact path={"/"}>
            <LogIn />
          </Route> }
          <Route exact path={"/logout"}>
            <LogIn />
          </Route>
          <Route exact path={"/login"}>
            <LogIn />
          </Route>
          <Route exact path={"/members"} render={()=>(
            isSignedIn ?  <Members /> : console.log("fuckyou") 
            )} />
          <Route exact path={"/submitbird"} render={(req)=>(
            isSignedIn ?  <SubmitBird /> : <Redirect to="/" />
            )} />
           <Route exact path={"/earth"} render={(req)=>(
            isSignedIn ?  <MapContainer />  :<Redirect to="/" />
            )} /> */}
                      <Route exact path={"/logout"}>
                      <LogIn />
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
                      <Route exact path={"/post/:id"}>
                      <UserPosts />
                      </Route>
                      <Route exact path={"/"}>
                      <Members />
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
