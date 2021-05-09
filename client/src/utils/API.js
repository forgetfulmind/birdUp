import axios from "axios";

export default {
  // // Gets all books
  // getBooks: function() {
  //   return axios.get("/api/books");
  // },
  // // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }
  // logIn: function(userData){
  //   return axios.post("/api/login", userData)
  // },
  saveUser: function(userData){
    return axios.post("/api/users", userData, {headers:{ContentType:`multipart-form-data`}})
  },
  saveDefault: function(userData){
    return axios.post("/api/users/default", userData, {headers:{ContentType:`multipart-form-data`}})
  },
  updateUser: function(id, userData){
    console.log(id, "submitted id")
    return axios.put("/api/users/" +id, userData, {headers:{ContentType:`multipart-form-data`}})
  },
  findUser: function(id){
    return axios.get("/api/users/" + id)
  },

  submitBird: function(userData) {
    return axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_API_KEY}`,
    {
      "requests":[
        {
          "image":{
            "content":`${userData}`
          },
          "features":[
            {
              "type":"LABEL_DETECTION",
              "maxResults":10
            }
          ]
        }
      ]
    })
  }, 

  uploadPost: function(userData) {
    return axios.post("api/posts", userData, {headers:{ContentType:`multipart-form-data`}})
  },

  //get all
  getObservations: function(){
    return axios.get("api/posts")
  },

  //get observations by user ID
  getUserObservations: function(id){
    return axios.get("/api/posts/" + id)
  },

  //delete posts
  deletePost: function(id){
    return axios.delete("api/posts/" + id)
  },

  getPost: function(id){
    return axios.get("/api/post/" + id)
  },

  updateUserName: function(id, userData) {
    return axios.put("/api/posts/" + id, userData)
  }

};
