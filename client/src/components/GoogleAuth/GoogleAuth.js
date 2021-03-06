import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as AuthorizationAction from "../../framework/redux/module/Authorization";
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import API from "../../utils/API"

//ignore eslint warnings
/*eslint-disable */

const GoogleAuth = ({ dispatch, isSignedIn, userId }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const params = {
      clientId:
        process.env.REACT_APP_GOOGLE_CLOUDID,
      scope: "email",
    };
    // console.log(params)

    window.gapi.load("client:auth2", () => {
      window.gapi.client.init(params).then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      dispatch(
        AuthorizationAction.signIn(
          window.gapi.auth2.getAuthInstance().currentUser.get().getId()
        )
      );
    } else {
      dispatch(AuthorizationAction.signOut());
    }
  };

  const onSignInClick = () => {
    auth.signIn()
    // .then((res)=>{localStorage.setItem('signIn', true)})
    .then((res)=>{
      localStorage.setItem('signIn', true)
      localStorage.setItem('userId', res.ft.tS.toString())
      // console.log(res, "res from signIN")
      const data = {
        'username': res.ft.Qt.split("@")[0].toString(),
        'image': "https://birdup.s3.us-east-2.amazonaws.com/cock.jpg", 
        'userId': res.ft.tS.toString()
      }
      API.findUser(res.ft.tS)
      .then(res => {
        console.log(res, "found user")
          if(res.data.length === 0) {
            // console.log('saved')
            API.saveDefault(data).then(res => console.log(res, "52"))
            }
          })
    })
  };

  const onSignOutClick = () => {
    auth.signOut()
    .then((res)=>{
      localStorage.setItem('signIn', false)
      localStorage.setItem('userId', "")


    })
    .then(res => {window.location.assign("/")})
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <div>
          {/* <span>{userId}</span> */}
          <button onClick={onSignOutClick}>Signout</button>
        </div>
      );
    } else {
      return <button onClick={onSignInClick}>Sign In with Google</button>;
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(GoogleAuth);
