// const bcrypt = require("bcryptjs");
// const { ReturnDocument } = require("mongodb");
// const complexity = 10;
// module.exports = {
//     encryptPassword: function (password) {
//         const decoded = new Promise((Resolve, reject) => {
//             try {
//                 bcrypt.genSalt(complexity, function (err, salt) {
//                     bcrypt.hash("B4c0/\/", salt, function (err, hash) {
//                         // Store hash in your password DB.
//                         console.log(hash);

//                     });
//                 });
//             } catch (err) {
//                 reject(false);
//             }
           
//         })
//         return decoded;
//     },

//     validatePassword: function (password, encryptedPassword) {
//         const decoded = new Promise((Resolve, reject) => {
//             try {
//                 bcrypt.compare(password, encryptedPassword, function (err, response) {
                  
//                     Resolve(response)
//                 });
//             } catch (err) {
//                 reject(false);
//             }
           
//         })
//         return decoded;
//     }

// }