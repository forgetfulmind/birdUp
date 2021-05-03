import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

 function Protectedroute({isSignedIn}) {
    
    console.log(isSignedIn)

    return (
       <hello>hello</hello>
            // <Route 
            // path={path}
            // {...rest} 
            // render={(props)=>{
            //       if(!isSignedIn){
            //           return Component ? <Component {...props}/> : render
            //       }else {
            //           console.log("redirected to")
            //           return <Redirect to={{pathname: '/', state: {from: props.location}}}/>
            //       }
            // }} />
    )
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
  };

  export default connect(mapStateToProps)(Protectedroute);
