import React, { useState, useEffect } from "react";
import Nav from "../Nav/index"
import API from "../../utils/API";
import { connect } from "react-redux";
import style from "./style.css"

function UserPage({userId}) {
    // create state using hooks, drop info into placeholder locations
    const [observationData, setObservationData] = useState([])

    function loadPosts(){
      API.getUserObservations(userId)
      .then(observations => {
        setObservationData(observations.data)
      })
    }

    const [userProfile, setUserProfile] = useState([])

    function loadUser() {
      // console.log(userId)
      API.findUser(userId)
      .then(user => {
          setUserProfile(user)
          // console.log(user)
      })
    }

    useEffect(()=>{
      console.log(userProfile)
    },[userProfile])

    useEffect(()=>{
      // loadUser() 
      // loadPosts()
      // console.log(observationData)
    },[])
    loadUser() 
    loadPosts()
    // if(userProfile.data){
    //   console.log(userProfile)
      return (
        <div className="wrapper"> 
          <div className="mainImage d-flex justify-content-center align-items-center flex-column">
            <div className="filter">
             <div className="boxHeading">
                <span className="heading">
                  { userProfile && userProfile !== [] ? <h1>{userProfile.data?.[0]?.username}</h1> : null }
                </span>
                <div className="userProps">
                  {userProfile && userProfile !== [] ? <p>{userProfile.data?.[0]?.createdAt.split("T")[0]}</p> : null}
                  {observationData && observationData!== [] ? <p> {observationData.length} </p> : <p>No Observations Yet</p> }
                  { userProfile && userProfile !== [] ? <img src={`/Images/2021${userProfile.data?.[0]?.profileimage.split(2021)[1]}`} className="observationImage"/> : null}
                </div>
              </div>
            </div>
            <div className="search">
            </div>
          </div>
            <Nav />
        </div>
      )
    // }else {
    //   return null
    // }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
  };
  export default connect(mapStateToProps)(UserPage);