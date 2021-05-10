// import React, { useState, useEffect } from "react";
// import API from "../utils/API";
// import { Input, FormBtn } from "../components/Form";
import React from "react"
import Observations from "../../components/Observations/Observations"
import UserPage from "../../components/UserPage/UserPage"
// import Nav from "../../components/Nav/index"


//create state 
function Members() {
    return (
    <div>
      <div className="members">
        <UserPage />
        <Observations />
      </div>
      {/* <Nav /> */}
    </div>
  )
}

export default Members;
