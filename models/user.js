// import { isEmail } from 'validator';
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type:String,
    trim: true,
    
  },
  profileimage: {
    type:String,
    trim: true
    
    
},
  userId: {
    type:String,
    trim: true,
    
},

}, {timestamps: true })




//   email: {
//     type: String,
//     trim: true,
//     lowercase: true,
//     unique: true,
//     validate: {
//         validator: function(v) {
//             return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
//         },
//         message: "Please enter a valid email"
//     },
//     required: [true, "Email required"]
// },
//   password: { 
//     type: String, 
//     required: true },
//   username: { 
//       type: String, 
//       required: true }
// });


// // before save password is hashed
//  UserSchema.pre('save', function(next) {
//   // check if password is present and is modified.
//   if ( this.password && this.isModified('password') ) {
//     // return the hashed password.
//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);

//   }
//   next();
// });

// //method for checking if password is valid
// UserSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };






const User = mongoose.model("User", UserSchema);


module.exports = User;
