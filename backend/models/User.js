// Models define database structure.
// Purpose:Store user accounts

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

export default mongoose.model("User",userSchema);

// Logic

// When user registers:

// {
//  "name":"Abbas",
//  "email":"abbas@gmail.com",
//  "password":"123456"
// }

// MongoDB stores:
// Users Collection