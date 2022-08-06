// const jwt = require('jsonwebtoken');

// function authenToken(req, res, next) {
//     const authorizationClient = req.headers['authorization'];
//     const token = authorizationClient && authorizationClient.split(' ')[1];

//     if (!token) return res.sendStatus(401);

//     try {
//         jwt.verify(token, 'RESTFULAPIs');
//         next();
//     } catch (err) {
//         return res.sendStatus(403);
//     }
// }

// module.export = authenToken;
