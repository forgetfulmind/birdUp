import React, { useState, useEffect } from "react";
import placeholder from './placeholder.png';
import { connect } from "react-redux";
import { Input } from '../../components/Form';
import API from "../../utils/API";
import Nav from "../../components/Nav"
import './style.css'

//ignore eslint warnings
/*eslint-disable */

function EditProfile({userId}) {
    //set state
    // const [userProfile, setUserProfile] = useState([])
    const [userName, setUserName] = useState()
    const [{alt, src}, setImg] = useState({
        src: placeholder,
        alt: 'Upload an Image'
    })
    // const[userImage, setUserImage] = useState([])
    const[imgUrl, setImgUrl] = useState("0")

    const handleImg = (e) => {
        if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });  
        }   
        getSignedRequest(e.target.files[0])
        // setUserImage([ e.target.files[0] ])  
    }  

     function handleNameChange(event) {
        setUserName(event.target.value)
     }


    function handleFormSubmit(event){
        event.preventDefault();

               
        let data = {
            'userId':userId,
            'image': imgUrl,
            'username': userName
          }
            
            console.log(data)

            API.findUser(userId)
            .then(res => {
            return res;
                })
                .then((res) => {
                    console.log(res, "found user")
                    if(res.data.length === 0) {
                        console.log('saved')
                        API.saveUser(data).then(res => console.log(res, "52"))
                        document.getElementById("submitForm").reset();
                        let alert = document.getElementById("alert")
                        alert.textContent = "Updated profile successfully"
                        setInterval(() => {
                        alert.textContent = ""
                        }, 5000);
                    }else {
                        console.log('updated')
                        API.updateUser(userId, data).then(res => console.log(res,70))
                        console.log(userName)
                        API.updateUserName(userId, {'username': userName}).then(res => console.log(res,71))
                        document.getElementById("submitForm").reset();
                        let alert = document.getElementById("alert")
                        alert.textContent = "Updated profile successfully"
                        setInterval(() => {
                            alert.textContent = ""
                        }, 5000);
                    }
                })
                    
    }






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
    // console.log(timestamp)
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





    return(
        <div className="submissionContainer">
            
            <div className="formContainer">
                
                <form id={"submitForm"} encType="multipart/form-data">
                <h4>Edit Your Profile</h4>
                
                <Input 
                    onChange={handleNameChange}
                    name="userName"
                    placeholder="Enter your new Username here."
                />
                <Input
                    onChange={handleImg}
                    name="image"
                    placeholder="Select a profile image."
                    type="file"
                />
                <button
                onClick={handleFormSubmit}>
                Submit
                </button>
                </form>
                <div className="form__img-input-container">
                    <img src={src} alt={alt} className="form-img__img-preview"/>
                </div>
                <h4 id={"alert"}></h4>
                <Nav />
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
  };
  
  export default connect(mapStateToProps)(EditProfile);