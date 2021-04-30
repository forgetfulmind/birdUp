const mongoose = require('mongoose');
const fs = require('fs')

const PostsSchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        
    },
    image: {
        type:String,
        trim: true
        
        
    },
    lat: {
        type:String,
        trim: true,
        
    },
    lng: {
        type:String,
        trim: true,
        
    },
    comment: {
        type:String,
        trim: true,
        
    },
    

}, {timestamps: true })


const Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;