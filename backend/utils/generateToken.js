// Purpose:Create JWT token

import jwt from "jsonwebtoken";

const generateToken = (id) => {

 return jwt.sign(
 {
   id
 },
 process.env.JWT_SECRET,
 {
   expiresIn:"7d"
 }
 );

};

export default generateToken;

// Logic

// After login:

// User verified
//      ↓
// Generate Token
//      ↓
// Send Token

// Token: abc.xyz.123

// Frontend stores token.