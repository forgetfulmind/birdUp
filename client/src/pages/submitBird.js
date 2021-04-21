import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";

//create state 
function SubmitBird() {

  const [birdObject, setBirdObject] = useState({})

  useEffect(() => {
  }, [])

  //hand input for email and password fields into state 
  function handleInputChange(event) {
    const { name, value } = event.target;
    setBirdObject({...birdObject, [name]: value})
  };

  //form submit handling
  function handleFormSubmit(event) {
    event.preventDefault();
    // console.log("click")
    // console.log(formObject.email)
    // console.log(formObject.password)
    if (birdObject.image) {
            const vision = require('@google-cloud/vision');
                
            // Creates a client
            const client = new vision.ImageAnnotatorClient({
                keyFilename: "../MyKey.json"
            });
          
            // Performs label detection on the image file
            const [result] = client.labelDetection([ birdObject.image ]);
            const labels = result.labelAnnotations;
            console.log('Labels:');
            labels.forEach(label => console.log(label));
          return labels
    }else {
      return
    }
  };


    return (
      <div>
        <h1>Save observations.</h1>
      <form>
        <Input
          onChange={handleInputChange}
          name="image"
          placeholder="Image (required)"
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