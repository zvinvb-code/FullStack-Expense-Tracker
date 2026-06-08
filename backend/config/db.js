// Connect backend with MongoDB Atlas
// Without this file:

// Backend cannot store data.

import mongoose from "mongoose";

const connectDB = async () => {

 try {

   const conn = await mongoose.connect(
      process.env.MONGO_URI
   );

   console.log(
      `MongoDB Connected: ${conn.connection.host}`
   );

 } catch(error){

   console.log(error);

   process.exit(1);

 }

};

export default connectDB;

// Logic
// mongoose.connect()

// tries to establish a connection
// between backend and MongoDB Atlas.

// If success:
//     server starts

// If fail:
//     server stops