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
  logIn: function(userData){
    return axios.post("/api/login", userData)
  },
  saveUser: function(userData){
    return axios.post("/api/users", userData)
  },

  submitBird: function(userData) {
    return axios.post("apikey",
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
  } 

};
