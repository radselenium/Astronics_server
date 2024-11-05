// 'use strict'
// const verify = require('./verifyToken');
// const db = require('../models');
// const User = db.userDBObject;

// function isAuth(request, response, next) {
//     console.log(request)   

//     if (request.url != '/login' && !request.headers.authorization)
//         return response.status(403).send({ message: 'No Authorization Key Exists' });
//     if (request.url != '/login') {
//         const token = request.headers.authorization.split(" ")[1];
//         verify.decodeToken(token)
//             .then(response => {
//                 console.log(response)
//                 request.user = response;
//                 User.findById(response)
//                     .then(result => {
//                         console.log(result)
//                         if(!result){
//                             return response.status(err.status).send({ message: 'Unauthorized User' })
//                         }
//                         request.role = result.role;
//                         request.cageCode = result.cageCode;
//                         next();
//                     });
                
//             })
//             .catch(err => {
//                 console.log(err)
//                 return response.status(err.status).send({ message: err.message })
//             });
//     }else{
//         next();
//     }
// }

// module.exports = isAuth;