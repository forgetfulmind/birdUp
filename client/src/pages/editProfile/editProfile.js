import React, { useState, useEffect } from "react";
import placeholder from './placeholder.png';
import { connect } from "react-redux";
import { Input, FormBtn } from '../../components/Form';
import API from "../../utils/API";
import Nav from "../../components/Nav"
import './style.css'

function EditProfile({userId}) {
    //set state
    const [userProfile, setUserProfile] = useState([])
    const [userName, setUserName] = useState([])
    const [{alt, src}, setImg] = useState({
        src: placeholder,
        alt: 'Upload an Image'
    })
    const[userImage, setUserImage] = useState([])
    const [userImage64, setUserImage64] = useState([])

    

    const handleImg = (e) => {
        if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });  
        }   
        setUserImage([ e.target.files[0] ])  
    }  


    function loadUser() {
        API.findUser(userId)
        .then(user => {
            setUserProfile(user)
        })
    }

    // useEffect(() => {
    //     loadUser()
    //     console.log(userProfile, 22)
    // },[]);

    // useEffect((event) => {
    //         console.log(userName)
    //         console.log(userImage)
    //         console.log(userId)
    //         const data = new FormData() 
    //         data.append('userId', userId.toString())
    //         data.append('postsImage', userImage[0])
    //         data.append('username', userName)
            
    //         console.log(data)
    //         API.editUser(data).then(res => console.log(res, "52"))

    //   },[userImage])
      
    // //set the updated Image, append to page 
    // function handleImageChange(event) {
    //     setImg([ event.target.files[0] ])
    //     console.log({alt, src})
    //  };

     //set the new Name
     function handleNameChange(event) {
        setUserName([ event.target.value ])
     }


    function handleFormSubmit(event){
        event.preventDefault();

        console.log(userName)
            console.log(userImage)
            console.log(userId)
            console.log(userName)
            const data = new FormData() 
            data.append('userId', userId)
            data.append('postsImage', userImage[0])
            data.append('username', userName)
            
            console.log(data)
            API.findUser(userId)
            .then(res => {
            return res;
                })
                .then((res) => {
                    console.log(res)
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
                        API.updateUser(userId, data).then(res => console.log(res,88))
                        document.getElementById("submitForm").reset();
                        let alert = document.getElementById("alert")
                        alert.textContent = "Updated profile successfully"
                        setInterval(() => {
                            alert.textContent = ""
                        }, 5000);
                    }
                })
                    




    // if(userImage) {
    //    //grab data from form;
    //     // console.log (userProfile[0].size);
    //     if(parseInt(userImage[0].size)> 1400000) {
    //         let reader = new FileReader();
    //         reader.readAsDataURL(userImage[0]);
    //         reader.onload = function () {
    //         setUserImage64([reader.result]);
    //         };
    //         reader.onloadend= function(){
    //             // console.log(userProfile64)
    //             console.log("before")
    //             resize();
    //         }
    //     }else{
    //         let reader = new FileReader();
    //         reader.readAsDataURL(userImage[0]);
    //         reader.onload = function () {
            
            
    //         };
    //         reader.onloadend= function(){
    //             console.log("submit")
    //             setUserImage64(reader.result);
    //             // console.log(reader.result)
    //             console.log(userImage64,88)
    //         }
    //     }

    // }
    }

    
  //image compression function 
//   function resize() {
//     let image = new Image()
//     image.src = userImage64
//     image.onload= function(){
//     let canvas = document.createElement("canvas")
//     canvas.width = image.width/1.7
//     canvas.height = image.height/1.7
//     const context = canvas.getContext("2d")
//     context.drawImage(image, 0, 0, canvas.width, canvas.height)
//     setUserImage64(canvas.toDataURL("image/jpeg", 0.8))
//     console.log("after")
// }}


    return(
        <div>
            <h1>Edit Your Profile here.</h1>
            <form id={"submitForm"} encType="multipart/form-data">
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
            <FormBtn
              onClick={handleFormSubmit}>
            Submit
            </FormBtn>
            </form>
            <div className="form__img-input-container">
                <img src={src} alt={alt} className="form-img__img-preview"/>
            </div>
            <h4 id={"alert"}></h4>
            <Nav />
        </div>
    )
}


const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
  };
  
  export default connect(mapStateToProps)(EditProfile);