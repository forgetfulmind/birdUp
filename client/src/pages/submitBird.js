import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";



//create state 
function SubmitBird() {

const [birdObject, setBirdObject] = useState({})
const [birdObject64, setBirdObject64] = useState({})

  useEffect(() => {
  }, [])

  useEffect((event) => {
    console.log(birdObject, 17)
  },[birdObject])

  useEffect((event) => {
     //console.log(birdObject64, 17)
    let base64 = birdObject64.toString()
    API.submitBird(base64.split(",")[1]).then(res => {console.log(res)})
    
  },[birdObject64])

  //hand input for email and password fields into state 
  function handleInputChange(event) {
      //console.log(event.target.files)
    
     setBirdObject([ event.target.files[0] ])
    
    //console.log(birdObject, 26)
  };

  //form submit handling
  function handleFormSubmit(event) {
    event.preventDefault();
    if(birdObject) {
       //grab data from form;
        console.log (birdObject[0].size);
        if(parseInt(birdObject[0].size)> 1400000) {
            let reader = new FileReader();
            reader.readAsDataURL(birdObject[0]);
            reader.onload = function () {
            setBirdObject64([reader.result]);
            };
            reader.onloadend= function(){
                console.log(birdObject64)
                console.log("before")
                resize();
            }
        }else{
            let reader = new FileReader();
            reader.readAsDataURL(birdObject[0]);
            reader.onload = function () {
                // console.log(reader.result, 50)
            //  setBirdObject64([reader.result]);
            
            };
            reader.onloadend= function(){
                
                console.log("submit")
                setBirdObject64(reader.result);
                console.log(reader.result)
                console.log(birdObject64,59)
                // API.submitBird(birdObject64[0]).then(res => {console.log(res)})
            }
        }

    }
  };

  //image compression function 
  function resize() {
    let image = new Image()
    image.src = birdObject64
    image.onload= function(){
    let canvas = document.createElement("canvas")
    canvas.width = image.width/1.7
    canvas.height = image.height/1.7
    const context = canvas.getContext("2d")
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    setBirdObject64(canvas.toDataURL("image/jpeg", 0.8))
    // console.log(birdObject64)
    console.log("after")
    // API.submitBird(birdObject64[0]).then(res => {console.log(res)})
}}



    return (
      <div>
        <h1>Save observations.</h1>
      <form encType="multipart/form-data">
        <Input
          onChange={handleInputChange}
          name="image"
          placeholder="Image (required)"
          type="file"
        />
            <FormBtn
              onClick={handleFormSubmit}
            >
            Submit
            </FormBtn>
    </form>
    </div>
    )

}

export default SubmitBird;