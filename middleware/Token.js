// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const generateToken = (username) => {
//   console.log("hello ");  
//   try {
     
//       const token = jwt.sign(
//         { username },       
//         process.env.JWT_KEY,       
//         { expiresIn: '1h' }
//       );
//       return token;
//     } catch (error) {
//       console.error('Failed to generate token:', error);
//       throw new Error('Token generation failed');
//     }
//   };

//  const validateToken=(token)=>{
//     try{
//         console.log(token);
       
        
//     }
//     catch(error){
//         return false;
//     }
   
//  }

// module.exports.generateToken=generateToken;
// module.exports.validateToken=validateToken;