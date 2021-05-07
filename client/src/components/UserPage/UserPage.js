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

    // useEffect(()=>{
    //   console.log(userProfile)
    // },[userProfile])

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
            <div className="userProps">
              { userProfile.length !== 0 ? <img src={`${userProfile.data?.[0]?.profileimage}`} className="observationImage"/> : null}
            </div>
            <span className="heading">
              {userProfile && userProfile !== [] ? <h1>{userProfile.data?.[0]?.username}</h1> : null}
              <span>Observations: {observationData && observationData!== [] ? <span> {observationData.length} </span> : <span> No Observations Yet</span> }</span>
              <span>Joined: {userProfile && userProfile !== [] ? <span> {userProfile.data?.[0]?.createdAt.split("T")[0]}</span> : null}</span>
            </span>
          </div>
            <Nav />
        </div>
        </div>
        </div>
      )
      

}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
  };
  export default connect(mapStateToProps)(UserPage);