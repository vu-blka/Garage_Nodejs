const role = require('./role.route');
const user = require('./user.route');
const product = require('./product.route');
const service = require('./service.route');
const account = require('./account.route');
const productType = require('./productType.route');
const serviceType = require('./serviceType.route');
const manufacturer = require('./manufacturer.route');

function route(app) {
    app.use('/api/role', role);
    app.use('/api/user', user);
    app.use('/api/product', product);
    app.use('/api/service', service);
    app.use('/api/account', account);
    app.use('/api/serviceType', serviceType);
    app.use('/api/productType', productType);
    app.use('/api/manufacturer', manufacturer);
    // Action ---> Dispatcher ---> Function handler
}

module.exports = route;
