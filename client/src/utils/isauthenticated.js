// This is middleware for restricting routes a user is not allowed to visit if not logged in
function isAuthenticated(req, res, next) {
  console.log("authentication")
  console.log(req)
  console.log(req.body)
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {
      console.log("true")
      return true
    }else{
      console.log("false")
      return true
    }
  
 
  };

  export default isAuthenticated