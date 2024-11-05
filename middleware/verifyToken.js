// var jwt = require('jsonwebtoken');
// const moment = require('moment');
// const config = require('../config');


// function createToken(user) {
// 	const payload = {
// 		sub: user._id,
// 		iat: moment().unix(),
// 		exp: moment().add(14, 'days').unix(),
// 	}
// 	return jwt.sign(payload, config.SECRET_TOKEN);
// }

// function decodeToken(token) {
// 	const decoded = new Promise((resolve, reject) =>{
// 		try{
// 			const payload = jwt.verify(token, config.SECRET_TOKEN);
// 			if(payload.exp < moment().unix())
// 				reject({
// 					status: 401,
// 					message: 'Token is expired'
// 				});
// 			resolve(payload.sub);
// 		}catch(err){
// 			reject({
// 				status: 500,
// 				message: 'invalid token.'
// 			});
// 		}
// 	}); 
// 	return decoded;
// }

// module.exports = {
// 	createToken,
// 	decodeToken
// };