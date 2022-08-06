const db = require('./configs/db');
const cors = require('cors');
const route = require('./routes');
// const morgan        = require('morgan');
const express = require('express');

const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');

db.connect();

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// app.use(function (req, res, next) {
//     if (
//         req.headers &&
//         req.headers.authorization &&
//         req.headers.authorization.split(' ')[0] === 'Bearer'
//     ) {
//         jsonwebtoken.verify(
//             req.headers.authorization.split(' ')[1],
//             'RESTFULAPIs',
//             function (err, decode) {
//                 if (err) req.user = undefined;
//                 req.user = decode;
//                 next();
//             }
//         );
//     } else {
//         req.user = undefined;
//         next();
//     }
// });

route(app);
// app.use(morgan('combined'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
