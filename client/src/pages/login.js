import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";

//create state 
function LogIn() {

  const [formObject, setFormObject] = useState({})

  useEffect(() => {
  }, [])

  //hand input for email and password fields into state 
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  //form submit handling
  function handleFormSubmit(event) {
    event.preventDefault();
    // console.log("click")
    // console.log(formObject.email)
    // console.log(formObject.password)
    if (formObject.email && formObject.password) {
      API.logIn({
        email: formObject.email,
        password: formObject.password,
      })
        .then(res =>  window.location.replace("/members"))
        .catch(err => console.log(err));
    }else {
      return
    }
  };

  function goToPage(){
    window.location.replace("/signup")
  }


    return (
      <div>
        <h1>Login</h1>
      <form>
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
              // disabled={!(formObject.email && formObject.title)}
              onClick={handleFormSubmit}
            >
            Login
            </FormBtn>
    </form>
        <FormBtn onClick={goToPage}>Sign Up</FormBtn>
    </div>
    )

}






export default LogIn;
