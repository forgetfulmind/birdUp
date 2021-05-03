import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";
import { connect } from "react-redux";
import Nav from "../components/Nav"
// import exifr from 'exifr'


//create state 
function SubmitBird({userId}) {

const [birdObject, setBirdObject] = useState({})
const [birdObject64, setBirdObject64] = useState({})
const [comment, setComment] = useState({})

  const [ currentPosition, setCurrentPosition ] = useState({});
  
  const success = position => {
    const userPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(userPosition);
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  },[])

  

  useEffect((event) => {
    // console.log(birdObject, 17)
  },[birdObject])

  useEffect((event) => {
    let base64 = birdObject64.toString()
    API.submitBird(base64.split(",")[1]).then(res => {
      // console.log(res)
      let response = res.data.responses[0].labelAnnotations.filter(desc => desc.description === "Bird")
      // console.log(response, 26)

//IF BIRD DO THIS
      if(response.length > 0) {
        const data = new FormData() 
        data.append('postsImage', birdObject[0])
        data.append('name', userId)
        data.append('lat', currentPosition.lat)
        data.append('lng', currentPosition.lng)
        data.append('comment', comment)
        // console.log(userId)
        // console.log(data)
        API.uploadPost(data)
          .then(res => console.log(res, "response"))
          let alert = document.getElementById("alert")
          alert.textContent = "Upload was a Success!"
          setInterval(() => {
            alert.textContent = ""
          }, 2000);
          document.getElementById("submitForm").reset();

//IF NO BIRD DO THIS           
        }else{ 
          let alert = document.getElementById("alert")
          alert.textContent = "Sorry no bird was found in this image, please upload another"
          setInterval(() => {
            alert.textContent = ""
          }, 2000);
          document.getElementById("submitForm").reset();
        }
    }) 
  },[birdObject64])

//handle hook for image input
  function handleInputChange(event) {
     setBirdObject([ event.target.files[0] ])
  };

//handle hook for comment input
  function handleCommentsChange(event) {
    // console.log(event.target.value)
    setComment( event.target.value )
  }

//form submit handling
  function handleFormSubmit(event) {
    event.preventDefault();
    if(birdObject) {

//
        // console.log (birdObject[0].size);
        if(parseInt(birdObject[0].size)> 1400000) {
            let reader = new FileReader();
            reader.readAsDataURL(birdObject[0]);
            reader.onload = function () {
            setBirdObject64([reader.result]);
            };
            reader.onloadend= function(){
                // console.log(birdObject64)
                // console.log("before")
                resize();
            }
        }else{
            let reader = new FileReader();
            reader.readAsDataURL(birdObject[0]);
            reader.onload = function () {
            
            
            };
            reader.onloadend= function(){
                console.log("submit")
                setBirdObject64(reader.result);
                // console.log(reader.result)
                // console.log(birdObject64,59)
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
    // console.log("after")
}}



    return (
      <div>
        <h1>Save observations.</h1>
      <form id={"submitForm"} encType="multipart/form-data">
        <Input
          onChange={handleInputChange}
          name="image"
          placeholder="Image (required)"
          type="file"
        />
      <Input
          onChange={handleCommentsChange}
          placeholder="Comment"
          type="textarea"
        />
            <FormBtn
              onClick={handleFormSubmit}
            >
            Submit
            </FormBtn>
    </form>
    <h4 id={"alert"}></h4>
    <Nav />
    </div>
    )

}

// export default SubmitBird;
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};



export default connect(mapStateToProps)(SubmitBird);