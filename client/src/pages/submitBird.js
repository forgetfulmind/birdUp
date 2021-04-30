import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";
import { connect } from "react-redux";
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
    console.log(birdObject, 17)
  },[birdObject])

  useEffect((event) => {
    let base64 = birdObject64.toString()
    API.submitBird(base64.split(",")[1]).then(res => {
      console.log(res)
      let response = res.data.responses[0].labelAnnotations.filter(desc => desc.description === "Bird")
      console.log(response, 26)

      if(response.length > 0) {
        
        const data = new FormData() 
        data.append('postsImage', birdObject[0])
        data.append('name', userId)
        data.append('lat', currentPosition.lat)
        data.append('lng', currentPosition.lng)
        data.append('comment', comment)
        
        console.log(userId)
        console.log(data)
        API.uploadPost(data).then(res => console.log(res, "54"))
        }
    }) 
  },[birdObject64])

  //hand input for email and password fields into state 
  function handleInputChange(event) {
    
     setBirdObject([ event.target.files[0] ])
  };
  function handleCommentsChange(event) {
    console.log(event.target.value)
    setComment( event.target.value )
  }

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
            
            
            };
            reader.onloadend= function(){
                console.log("submit")
                setBirdObject64(reader.result);
                console.log(reader.result)
                console.log(birdObject64,59)
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
    console.log("after")
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
      <Input
          onChange={handleCommentsChange}
          placeholder="Comments (required)"
          type="textarea"
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

// export default SubmitBird;

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(SubmitBird);