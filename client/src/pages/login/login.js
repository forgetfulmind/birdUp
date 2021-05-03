// import React, { useState, useEffect } from "react";
import React from "react";
// import API from "../../utils/API";
// import { Input, FormBtn } from "../../components/Form";
import style from "./style.css"
// import Login from "../../components/Login/login"
import birdUp from "../../assets/birdUp.svg"
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth"
import Nav from "../../components/Nav/index"
//create state 
function LogIn() {

  // const [formObject, setFormObject] = useState({})

  // useEffect(() => {
  // }, [])

  // //hand input for email and password fields into state 
  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setFormObject({...formObject, [name]: value})
  // };

  // //form submit handling
  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   // console.log("click")
  //   // console.log(formObject.email)
  //   // console.log(formObject.password)
  //   if (formObject.email && formObject.password) {
  //     API.logIn({
  //       email: formObject.email,
  //       password: formObject.password,
  //     })
  //       .then(res =>  window.location.replace("/members"))
  //       .catch(err => console.log(err));
  //   }else {
  //     return
  //   }
  // };

  // function goToPage(){
  //   window.location.replace("/signup")
  // }
  
    return (
      <div className="landing">
        <div className="sideBar">

        </div>

        <div className="login">
          <div className="container">
            <h2 className="birdUp">Bird<strong>Up</strong></h2>
            <img src={birdUp} className="emblem"/>
          </div>
        {/* <h1>Login</h1> */}
        {/* <Login /> */}
        <GoogleAuth />
        {/* <form>
          <Input
            onChange={handleInputChange}
            name="email"
            placeholder="Email (required)"
          />
          <Input
            onChange={handleInputChange}
            name="password"
            placeholder="Password (required)"
          />
          <FormBtn
            onClick={handleFormSubmit}
          >
          Login
          </FormBtn>
      </form>
        <FormBtn onClick={goToPage}>Sign Up</FormBtn> */}
      </div>

    </div>
    )

}






export default LogIn;
