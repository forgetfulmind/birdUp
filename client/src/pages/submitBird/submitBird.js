import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import placeholder from './imageplaceholder.png';
import { Input } from "../../components/Form";
import { connect } from "react-redux";
import Nav from "../../components/Nav"
import './style.css'

//ignore eslint warnings
/*eslint-disable */


//create state 
function SubmitBird({userId}) {
const [birdObject, setBirdObject] = useState({})
const [birdObject64, setBirdObject64] = useState(0)
const[imgUrl, setImgUrl] = useState("0")
const [comment, setComment] = useState({})
const [{alt, src}, setImg] = useState({
  src: placeholder,
  alt: 'Upload an Image'
})
const [ currentPosition, setCurrentPosition ] = useState({});
const [gUserName, setGUserName] = useState({})

const handleImg = (e) => {
  if(e.target.files[0]) {
      setImg({
          src: URL.createObjectURL(e.target.files[0]),
          alt: e.target.files[0].name
      });  
  }   
  setBirdObject([ e.target.files[0] ])  
}

function loadUser() {
  // console.log(userId)
  API.findUser(userId)
  .then(user => {
      setGUserName(user.data[0].username)
      // console.log(user)
  })
}
  
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

useEffect(() => {
  loadUser()
  console.log(gUserName)
})

  useEffect((event) => {
    
    if(birdObject64 !== 0){
    let base64 = birdObject64.toString()
    API.submitBird(base64.split(",")[1]).then(res => {
      // console.log(res)
      let response = res.data.responses[0].labelAnnotations.filter(desc => desc.description === "Bird")
      // console.log(response, 26)

//IF BIRD DO THIS
      if(response.length > 0) {

       getSignedRequest(birdObject[0])
    

//IF NO BIRD DO THIS           
        }else{ 
          let alert = document.getElementById("alert")
          alert.textContent = "Sorry no bird was found in this image, please upload another"
          setInterval(() => {
            alert.textContent = ""
          }, 5000);
          document.getElementById("submitForm").reset();
        }
    }) 
  }
  },[birdObject64])
    

 //SEND IMAGE ONCE URL HOOK IS SET
  useEffect((event) => {
    if (imgUrl !== "0") {
      // console.log(imgUrl)       
      
    let data = {
      'image': imgUrl, 
      'username': gUserName,
      'userId': userId,
      'lat': currentPosition.lat,
      'lng': currentPosition.lng,
      'comment': comment,
    }
        // console.log(userId)
        console.log(data)
        API.uploadPost(data)
          .then(res => console.log(res, "response"))
          let alert = document.getElementById("alert")
          alert.textContent = "Upload was a Success!"
          setInterval(() => {
            alert.textContent = ""
          }, 5000);
          document.getElementById("submitForm").reset();
    } 
  },[imgUrl])


//handle hook for image input
  function handleInputChange(event) {
     handleImg(event)
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



//===S3 STUFF===

//UPLOAD FILE 
function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        setImgUrl(url)
      }
      else{
       return null 
      }
    }
  };
  xhr.send(file);
}

//GET SIGNED REQUEST
function getSignedRequest(file){
  var timestamp = Date.now()
  console.log(timestamp)
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${timestamp}${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        console.log("signedinURLfail");
      }
    }
  };
  xhr.send();
}

//===END S3 STUFF===



    return (
      <div className="submissionContainer">
      <div className="formContainer">
        <form id={"submitForm"} encType="multipart/form-data">
        <h4>Save observations</h4>
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
              <button
                onClick={handleFormSubmit}
              >
              Submit
              </button>
      </form>
      <div className="form__img-input-container">
        <img src={src} alt={alt} className="form-img__img-preview"/>
      </div>
      <h4 id={"alert"}></h4>
      </div>
    <Nav />
    </div>
    )

}

// export default SubmitBird;
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};



export default connect(mapStateToProps)(SubmitBird);